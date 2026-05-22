import { initiatePayment } from "../services/Urubuto.services.js";


const verifySubscription = async (req, res) => {
    try {
        const {payercode} = req.body;
        
    } catch (error) {
        res.status(500).json({message: ""})
    }
}

export default verifySubscription;