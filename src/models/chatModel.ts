import mongoose, { Schema, Document } from 'mongoose';

// Structure
interface IMessage extends Document {
    content: string;
    user: string; // who sent message
    channel: string; // channel name
    createdAt: Date;
}

// schema
const messageSchema: Schema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
    createdAt: { type: Date, default: Date.now }
});

// model
const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;