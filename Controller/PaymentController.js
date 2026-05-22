import { verifyPayment } from "../services/Urubuto.services.js";

const paymentCheck = () => {
    try {
        
    } catch (error) {
        console.error("error during error ", error)
        res.status(500).json({message: "Error during Senting link"});
    }
}

export default paymentCheck;