import mongoose from "mongoose";

const Payment = new mongoose.Schema({
    PaymentDate: {
        type: Date,
        default: Date.now()
    },
    Plan: {
      type: String,
      enum: ["MEDIUM", "PREMIUM"],
      required: true
   },
    amount: {
      type: Number,
      required: true
   },
   internal_transaction_id: {
      type: String,
      required: true
   },
   external_transaction_id: {
      type: String,
      required: true
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
    }

});

const PaymentModel = mongoose.model('Payment',Payment);

export default PaymentModel;