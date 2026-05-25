import { initiatePayment } from "../services/Urubuto.services.js";
import crypto from "crypto";
import PaymentModel from "../Model/PaymentModel.js";
import UserModel from "../Model/UserModel.js";
import SubscriptionModel from "../Model/SubscriptionModel.js";
import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlan.js";
import validatePhone from "../utility/validatePhone.js";
const verifySubscription = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {plan, phone_number, channel_name} = req.body;
        if(!SUBSCRIPTION_PLANS[plan]){
            return res.status(400).json({
                message: "Invalid plan"
            });
        }
        if(!validatePhone(phone_number)){
            return res.status(400).json({
                message: "Please Enter valid phone number"
            });
        }

        const user = await UserModel.findById(userId);

        const planData = SUBSCRIPTION_PLANS[plan];
        const transaction_id = crypto.randomUUID();

        const payload = {
            amount: planData.amount,
            channel_name,
            merchant_code: process.env.URUBUTO_MERCHANT_CODE,
            payer_code: user.id.toString(),
            payer_names: user.username,
            phone_number,
            service_code: process.env.URUBUTO_SERVICE_CODE,
            transaction_id,
            payer_email: user.email
            
        };
        const response = await initiatePayment(payload);
        
        await PaymentModel.create({
            plan: plan,
            amount: planData.amount,
            internal_transaction_id: transaction_id,
            channel_name,
            phone_number,
            UserId: userId
        })
        await SubscriptionModel.create({})
        res.status(200).json({
            message: "Payment Initiated",
            data: response
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: ""})
    }
}

export default verifySubscription;