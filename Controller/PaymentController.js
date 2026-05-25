import { verifyPayment } from "../services/Urubuto.services.js";
import PaymentModel from "../Model/PaymentModel.js";
import SubscriptionModel from "../Model/SubscriptionModel.js";
import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlan.js";
import TaskWalletModel from "../Model/TaskWalletModel.js";
import taskStatementModel from "../Model/task_statement_model.js";

const paymentCheck = async (req,res) => {
    try {
        const {transaction_id} = req.body;
        
        const Payment = await PaymentModel.findOne({internal_transaction_id: transaction_id})
   
        if(!Payment) {
            return res.status(404).json({
                message: "Payment not Found"
            });
        }
        const response = await verifyPayment({
            merchant_code: process.env.URUBUTO_MERCHANT_CODE,
            transaction_id
        });

        const status = response.data.transaction_status;

        if(status !== "VALID") return res.status(400).json({message: "Payment not completed", status})
        
        const subscriptionPlan = SUBSCRIPTION_PLANS[Payment.Plan];
        const wallet = await TaskWalletModel.findOne({User: Payment.UserId})
        const opening_balance = wallet.InitialTask;
        const closing_balance = opening_balance + subscriptionPlan.tasks;
        wallet.InitialTask = closing_balance;

         await wallet.save();
         await SubscriptionModel.findOneAndUpdate(
            {User: Payment.UserId},
            {
                subscriptionPlan: Payment.Plan,
                SubscriptionStatus: "ACTIVE"
            },
            {
                upsert: true,
                new: true
            }
         );
         await taskStatementModel.create({
            Event: "Top_up",
            wallet_id: wallet._id,
            userId: Payment.UserId,
            task_number:
                subscriptionPlan.tasks,
            opening_balance,
            closing_balance
        });
        res.status(200).json({
            message: "Payment Sucessful Done",
            
        })
    } catch (error) {
        console.error("error during error ", error)
        res.status(500).json({message: "Error during Senting link"});
    }
}

export default paymentCheck;