import Message from "../../models/chatModel";  
import { Request, Response } from 'express';
import { writeUserConversationsToCSV } from './saveMessages';


export const exportChatBetween = async (req: Request, res: Response) => {
    try {

        const { startDate, endDate } = req.body; 

        const messages = await Message.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } // $gte: more or egual | $lte: laisse or egual
        }).populate('user'); // populaate() gives all details about the user ot only the Id

        await writeUserConversationsToCSV(messages);
        return messages;
    } catch (error) {
        console.error('Errot while trying to export messages .. That\'s the error :', error);
    }
}