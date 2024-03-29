import mongoose, { Document } from 'mongoose';

// structure
interface IUser extends Document {
    username: string;
    password: string;
    isAdmin: boolean;
}

// schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

// model
const User = mongoose.model<IUser>('User', userSchema);

export default User;