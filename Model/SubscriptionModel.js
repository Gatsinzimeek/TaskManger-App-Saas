import mongoose from "mongoose";

const Subscription = new mongoose.Schema({
     SubscriptionPlan: {
      type: String,
      enum: ["FREE", "MEDIUM", "PREMIUM"],
      default: "FREE"
   },
   SubscriptionStatus: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "PENDING"],
      default: "ACTIVE"
   },
   User: {
           type: mongoose.Types.ObjectId,
           ref: "User",
           required: true
       },
});


const SubscriptionModel = mongoose.model('subscription', Subscription);

export default SubscriptionModel;