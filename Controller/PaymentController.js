import PaymentModel from "../Model/PaymentModel.js";
import SubscriptionModel from "../Model/SubscriptionModel.js";
import TaskWalletModel from "../Model/TaskWalletModel.js";
import taskStatementModel from "../Model/task_statement_model.js";
import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlan.js";

const processPayment = async(req,res)=>{
   try{

      const payment = await PaymentModel.findOne({
         UserId:req.user.userId
      })
      .sort({createdAt:-1});

      if(!payment){
         return res.status(404).json({
            message:"Payment not found"
         });
      }

      if(payment.processed){
         return res.status(200).json({
            message:"Already processed"
         });
      }

      if(payment.payment_status !== "VALID"){
         return res.status(400).json({
            message:"Payment not completed"
         });
      }

      const plan = SUBSCRIPTION_PLANS[payment.plan];

      const wallet =
      await TaskWalletModel.findOne({
         User:payment.UserId
      });

      const opening_balance =
      wallet.InitialTask;

      const closing_balance =
      opening_balance + plan.tasks;

      wallet.InitialTask =
      closing_balance;

      await wallet.save();

      await SubscriptionModel.findOneAndUpdate(
         {
            User:payment.UserId
         },
         {
            subscriptionPlan:payment.plan,
            SubscriptionStatus:"ACTIVE"
         },
         {
            upsert:true,
            new:true
         }
      );

      await taskStatementModel.create({
         Event:"Top_up",
         wallet_id:wallet._id,
         userId:payment.UserId,
         task_number:plan.tasks,
         opening_balance,
         closing_balance
      });

      payment.processed = true;

      await payment.save();

      res.status(200).json({
         message:"Subscription activated"
      });

   }catch(error){

      console.log(error);

      res.status(500).json({
         message:"Server Error"
      });
   }
}

export default processPayment;