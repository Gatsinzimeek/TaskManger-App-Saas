import { verifyPayment } from "../services/Urubuto.services.js";
import PaymentModel from "../Model/PaymentModel.js";
import SubscriptionModel from "../Model/SubscriptionModel.js";
import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlan.js";

const paymentCheck = async () => {
    try {
        
    } catch (error) {
        console.error("error during error ", error)
        res.status(500).json({message: "Error during Senting link"});
    }
}

export default paymentCheck;