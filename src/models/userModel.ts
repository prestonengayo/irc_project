import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator' ;

// structure
interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    resetPasswordToken?: string; // Reset token
    resetPasswordExpires?: Date; // Token expiration
}

// schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String, 
    resetPasswordExpires: Date 

});

userSchema.plugin(uniqueValidator);

// model
const User = mongoose.model<IUser>('User', userSchema);

export default User;