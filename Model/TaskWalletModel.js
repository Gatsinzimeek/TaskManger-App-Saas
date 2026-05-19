import mongoose, { Mongoose, Schema } from "mongoose";

const TaskWallet = new Schema ({
    CustumedTask: {
        Number,
        default: 0,
        require: true
    },
    PaidTask: {
        Number,
        default: 0
    },
    InitialTask: {
        Number,
        default: 10
    }, 
    User: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    createAt: {
        Date,
        default: Date.now()
    },
    updatedAt: {
        Date,
        default: Date.now()
    }
    
});

const TaskWalletModel = mongoose.model('TaskWallet', TaskWallet);

export default TaskWalletModel;