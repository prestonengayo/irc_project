import mongoose, { Schema, Document } from 'mongoose';

// Structure
interface IChannel extends Document {
    name: string;
    description: string;
    type: string;
    members?: Schema.Types.ObjectId[]; 
  }
 
// Schema
const channelSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ['public_message', 'private_message', 'group_message'] },
    members: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  });

// Model from schema
const Channel = mongoose.model<IChannel>('Channel', channelSchema);

export default Channel;











