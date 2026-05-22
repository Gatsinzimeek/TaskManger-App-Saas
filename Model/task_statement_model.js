import mongoose from "mongoose";
import TaskWalletModel from "./TaskWalletModel";
const taskStatement = new mongoose.Schema({
    Event: {
        type: String,
        enum: ['Top_up', 'Debit']
    },
    wallet_id: {
        type: mongoose.Types.ObjectId,
        ref: "TaskWallet",
        require: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true,
    },
    task_number: {
        type: Number,
        require: true
    },
    opening_balance: {
        type: Number,
        require: true
    },
    closing_balance: {
        type: Number,
        require: true
    },
    createdAt: {
        Date,
        default: Date.now()
    },
    updateAt: {
        Date,
        default: Date.now()
    }

});

const taskStatementModel = mongoose.model('task_statement', taskStatement);

export default taskStatementModel;