import { Request, Response } from 'express';
import Message, { IMessage } from '../../models/chatModel';
import User, { IUser } from '../../models/userModel';
import Channel, { IChannel } from '../../models/indexModel';

export const getUserConversations = async (userId: string, req: Request, res: Response) => {
    try {
        /*const { userId } = req.session;*/
        const user = await User.findById(userId); // User info

        
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }
        // All user conversations
        const userConversations: IMessage[] = await Message.find({
            $or: [
                { user: userId }, // sender
                { receiverId: userId } // receiver
            ]
        }).populate('user');

        // Array for all conversations
        const formattedConversations: any[] = [];

        // Loop through conversations and put them in : formattedConversations
        for (const conversation of userConversations) {
            // channel name
            const channel: IChannel | null = await Channel.findById(conversation.channel);
            const channelName: string = channel ? channel.name : 'No channel';

            const receiver = await User.findById(conversation.receiverId); // Receiver  info
            const receiverName: string = receiver ? receiver.username : 'No specific receiver';

            // Format conversations
            const formattedConversation: any = {
                content: conversation.content,
                user: conversation.user,
                receiver: receiverName ,
                channel: channelName,
                messageType: conversation.messageType,
                createdAt: conversation.createdAt,
            };

            // add formated conversations to : formattedConversations
            formattedConversations.push(formattedConversation);
        }

        
        res.render('allUserChat', {  receiver: formattedConversations[2].receiver, username: user.username, userId: user._id, messages: formattedConversations });
    } catch (error) {
        console.error('Erreur lors de la récupération des conversations de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des conversations de l\'utilisateur.' });
    }
};
