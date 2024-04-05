import { Request, Response } from 'express';
import Message from '../../models/chatModel';
import { writeUserConversationsToCSV } from './saveMessages';


export const exportUserConversationsAsCSV = async (req: Request, res: Response) => {
    const { userId } = req.params; 
    try {
        
        const messages = await Message.find({ user: userId }).populate('user');
        
        await writeUserConversationsToCSV(messages);
        
        res.status(200).json({ message: 'Export done.' });
    } catch (error) {
        console.error('Error while trying to export user conversations :', error);
        res.status(500).json({ message: 'Error while trying to export user conversations.' });
    }
};