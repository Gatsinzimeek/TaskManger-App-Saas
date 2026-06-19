import PaymentModel from "../Model/PaymentModel.js";
import { verifyPayment } from "../services/Urubuto.services.js";

export const GetPaymentStatus = async (req,res)=>{
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

      const response = await verifyPayment({
         merchant_code:process.env.URUBUTO_MERCHANT_CODE,
         transaction_id:payment.internal_transaction_id
      });

      console.log(response.data);

      const status = response.data.transaction_status;

      payment.payment_status = status;

      await payment.save();

      res.status(200).json({
         status
      });

   }catch(error){
      console.log(error);

      res.status(500).json({
         message:"Server Error"
      });
   }
}