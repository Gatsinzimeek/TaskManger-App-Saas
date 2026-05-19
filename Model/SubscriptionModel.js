import mongoose from "mongoose";

const Subscription = new mongoose.Schema({
    Freetier: {
        Number,
        required: true,
        default: 10
    },
    Medium: {
        Number,
        required: true,
        default: 50
    },
    Premium: {
        Number,
        required: true,
        default: 100
    }
});


const SubscriptionModel = mongoose.model('subscription', Subscription);

export default Subscription;