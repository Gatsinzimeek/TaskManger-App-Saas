import mongoose from "mongoose";

const Payment = new mongoose.Schema({
    PaymentDate: {
        type: Date,
    },
    plan: {
      type: String,
      enum: ["MEDIUM", "PREMIUM"]
   },
    amount: {
      type: Number,
      required: true
   },
   internal_transaction_id: {
      type: String,
   },
   external_transaction_id: {
      type: String,
   },
    channel_name: {
        type: String,
        enum: ["MOMO","AIRTEL_MONEY","CARD"]
    },
    phone_number: {
        type: Number,
        required: true
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    payment_status: {
        type: String,
        enum: [
            "PENDING",
            "VALID",
            "FAILED"
        ],
        default: "PENDING"
    },
    createdAt: {
       type: Date,
        default: Date.now,
    },
    updatedAt: {
       type: Date,
        default: Date.now,
    },

});

const PaymentModel = mongoose.model('Payment',Payment);

export default PaymentModel;