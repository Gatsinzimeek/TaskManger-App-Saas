import { initiatePayment } from "../services/Urubuto.services.js";
import crypto from "crypto";
import PaymentModel from "../Model/PaymentModel.js";
import UserModel from "../Model/UserModel.js";
import SubscriptionModel from "../Model/SubscriptionModel.js";
import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlan.js";
import validatePhone from "../utility/validatePhone.js";

const verifySubscription = async (req,res)=>{
   try{

      const userId = req.user.userId;

      const {
         plan,
         phone_number,
         channel_name
      } = req.body;

      const user = await UserModel.findById(userId);

      const transaction_id = crypto.randomUUID();

      const planData = SUBSCRIPTION_PLANS[plan];

      await initiatePayment({
         amount:planData.amount,
         channel_name,
         merchant_code:process.env.URUBUTO_MERCHANT_CODE,
         payer_code:user.id,
         payer_names:user.username,
         phone_number,
         service_code:process.env.URUBUTO_SERVICE_CODE,
         transaction_id,
         payer_email:user.email
      });

      await PaymentModel.create({
         UserId:userId,
         plan,
         amount:planData.amount,
         internal_transaction_id:transaction_id,
         channel_name,
         phone_number,
         payment_status:"PENDING"
      });

      res.status(200).json({
         message:"Payment Initiated"
      });

   }catch(error){
      console.log(error);
   }
}

export default verifySubscription;