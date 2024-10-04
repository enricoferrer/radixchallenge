import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    createdAt: String,
})

userSchema.methods.comparePassword = function(password) {
    return password === this.password; 
};

var User= mongoose.model('user', userSchema);
export default User;