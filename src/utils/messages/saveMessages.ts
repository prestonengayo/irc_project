import { createObjectCsvWriter } from 'csv-writer';
import { IMessage } from '../../models/chatModel';


// Save in CSV Message function
export const writeUserConversationsToCSV = async (messages: IMessage[]) => {
   // CSV leta data
    const csvWriter = createObjectCsvWriter({
        path: 'user_conversations.csv',
        header: [
            { id: 'content', title: 'Content' },
            { id: 'channel', title: 'Channel' },
            { id: 'receiverId', title: 'Receiver ID' },
            { id: 'messageType', title: 'Message Type' },
            { id: 'createdAt', title: 'Created At' }
        ]
    });

    
    await csvWriter.writeRecords(messages);

    console.log('Export Done!');
};