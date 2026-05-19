import mongoose from "mongoose";

const Payment = new mongoose.Schema({
    PaymentDate: {
        Date,
        default: Date.now()
    },
    Amount: {
        Number,
        default: 0
    },
    PaymentMethod: {
        String,
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const PaymentModel = mongoose.model('Payment',Payment);

export default PaymentModel;