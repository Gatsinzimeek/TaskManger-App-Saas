import mongoose from "mongoose";

const Subscription = new mongoose.Schema({
    Freetier: {
        type: Number,
        default: 10
    },
    Medium: {
        type: Number,
        default: 50
    },
    Premium: {
        type: Number,
        default: 100
    }
});


const SubscriptionModel = mongoose.model('subscription', Subscription);

export default Subscription;