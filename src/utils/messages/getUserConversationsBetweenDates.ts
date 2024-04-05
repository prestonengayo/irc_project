

import { Request, Response } from 'express';
import Message, {IMessage} from '../../models/chatModel'; 
import User, {IUser} from '../../models/userModel'; 
import Channel, {IChannel} from '../../models/indexModel';

export const getUserConversationsBetweenDates = async (req: Request, res: Response) => {
    try {

        // Extract start and end dates from request parameters
        const { startDate, endDate } = req.params;

        // Convert string dates to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        console.log(startDate, endDate);
        // Getting all messages from the user
        const userConversations: IMessage[] = await Message.find({
            $and: [
                { createdAt: { $gte: start } }, // Messages created on or after the start date
                { createdAt: { $lte: end } }, // Messages created on or before the end date
                {
                    $or: [
                        { user: req.params.userId }, // User as sender
                        { receiverId: req.params.userId } // User as receiver
                    ]
                }
            ]
            
        }).populate('user');

        // Array to keep the info
        const formattedConversations: any[] = [];

        // Loop throuth conversations to add to the array and extract username and channel name 
        for (const conversation of userConversations) {
            // Extracting username
            const user: IUser | null = await User.findById(conversation.user);
            const username: string = user ? user.username : ''; 

            // Extracting channel name
            const channel: IChannel | null = await Channel.findById(conversation.channel);
            const channelName: string = channel ? channel.name : '';

            // 
            const formattedConversation: any = {
                _id: conversation._id,
                content: conversation.content,
                user: username,
                channel: channelName,
                messageType: conversation.messageType,
                createdAt: conversation.createdAt,
            };

            // Array with user conversations
            formattedConversations.push(formattedConversation);
        }
        res.status(200).json(formattedConversations);
    } catch (error) {
        
        console.error(`Error while trying to retrieve messages of the user ${req.params.startDate} :`, error);
        res.status(500).json({ message: 'Error while trying to retrieve messages of the user .' });
    }
};