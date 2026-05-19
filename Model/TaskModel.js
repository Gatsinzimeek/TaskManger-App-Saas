import mongoose from 'mongoose';
const taskModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['todo', 'inprogress', 'completed','testing'],
        default: 'todo',
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
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

const TaskModel = mongoose.model('Task', taskModel);

export default TaskModel;