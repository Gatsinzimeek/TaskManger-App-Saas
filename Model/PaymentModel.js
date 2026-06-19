import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
{
   PaymentDate: {
      type: Date
   },

   plan: {
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
      required: true,
      unique: true
   },

   external_transaction_id: {
      type: String
   },

   channel_name: {
      type: String,
      enum: ["MOMO", "AIRTEL_MONEY", "CARD"]
   },

   phone_number: {
      type: String,
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
         "INITIATED",
         "PENDING",
         "PENDING_SETTLEMENT",
         "VALID",
         "FAILED",
         "CANCELED"
      ],
      default: "INITIATED"
   },

   processed: {
      type: Boolean,
      default: false
   }
},
{
   timestamps: true
});

const PaymentModel =
mongoose.model("Payment", PaymentSchema);

export default PaymentModel;