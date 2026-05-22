import mongoose, { Mongoose, Schema } from "mongoose";

const TaskWallet = new Schema ({
    CustumedTask: {
        type: Number,
        default: 0
    },
    InitialTask: {
        type: Number,
        default: 10
    }, 
    User: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
    
});

const TaskWalletModel = mongoose.model('TaskWallet', TaskWallet);

export default TaskWalletModel;