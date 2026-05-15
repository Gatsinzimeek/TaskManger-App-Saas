import mongoose from 'mongoose';
const user = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }   
});
const UserModel = mongoose.model('User', user);   


export default UserModel;