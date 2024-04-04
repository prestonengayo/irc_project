import mongoose, { Schema, Document } from 'mongoose';


export interface IMessage extends Document {
    content: string;
    user: Schema.Types.ObjectId; 
    channel?: Schema.Types.ObjectId; 
    receiverId?: Schema.Types.ObjectId; 
    messageType: 'public' | 'private' | 'group'; 
    createdAt: Date;
}

const messageSchema: Schema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' }, 
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    messageType: { type: String, required: true, enum: ['public', 'private', 'group'] }, 
    createdAt: { type: Date, default: Date.now }
});


const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
