import mongoose, { Schema, Document } from 'mongoose';

// Structure
export interface IChannel extends Document {
    name: string;
    description: string;
    
}
 
// Schema
    const channelSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    
});

// Model from schema
const Channel = mongoose.model<IChannel>('Channel', channelSchema);

export default Channel;