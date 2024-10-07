import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    createdAt: String,
})


const User= mongoose.model('user', userSchema);
export default User;