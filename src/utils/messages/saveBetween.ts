import Message from "../../models/chatModel";  

// Fonction pour exporter les conversations entre deux périodes de temps données
export const exportChatBetween = async (startDate: Date, endDate: Date) => {
    try {
        
        const messages = await Message.find({
            createdAt: { $gte: startDate, $lte: endDate } //$gte: more or egual | $lte: laisse or egual
        }).populate('user'); // populaate() gives all details about the user ot only the Id

        return messages;
    } catch (error) {
        console.error('Errot while trying to export massages .. That\'s the error :', error);
    }
}