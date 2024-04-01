import { Request, Response } from 'express';
import Message from '../models/chatModel';

// Display the chat page
export const showChat = (req: Request, res: Response) => {
    res.render('chat', { error: null }); 
};

// Display the private chat page
export const showPrivateChat = (req: Request, res: Response) => {
    res.render('privateChat', { error: null }); 
};

// Process send data
export const sendMessage = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        //const user = await User.findByCredentials(username, password); 
        if (true) {
            // Session management/login success logic
            res.redirect('/chat'); 
        }
    } catch (error) {
        res.render('index', { error: 'Identifiants incorrects.' });
    }
};

/////////////////////////////////// CRUD //////////////////////////////////


  ////////////////
 //// CREATE //// 
////////////////

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { content, user, channel, createdAt } = req.body;// if ...req.body then without this line.
        const newMessage = new Message({ content, user, channel, createdAt }); //or just ...req.body
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Wow.. Error creating the message :', error);
        res.status(500).json({message:'Wow.. Error creating the message'});
    }
}


  ////////////////
 //// GET ALL ///
////////////////

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Wow.. Error , can\'t retrieve messages.', error);
        res.status(500).json({message: 'Wow.. Error , can\'t retrieve messages.'});
    }
}


  ////////////////////////
 //// GET ONE WITH ID ///
////////////////////////

export const getMessageById = async (req: Request, res: Response) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({message: 'Houston, we have a problem! Message not found.'});
        }
        res.status(200).json(message);
        } catch (error) {
            console.error('Wow.. Error retrieving the message', error),
            res.status(500).json({message: 'Wow.. Error retrieving the message'});
    }
}

  ///////////////
 //// UPDATE ///
///////////////

export const updateMessage = async (req: Request, res: Response) => {
    try {
        const   { messageId } = req.params;
        const updatedMessage = await Message.findByIdAndUpdate(messageId, req.body, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({message: 'Houston, we have a problem! Message not found.'});
        }
        res.status(200).json(updateMessage);
    } catch (error) {
        res.status(404).json({message: 'You won\'t believe.. Error updating the channel'});
        console.error('You won\'t believe.. Error updating the channel', error);
    }
   
}

  ///////////////
 //// DELETE ///
///////////////

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { messageId } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if(!deletedMessage) {
            return res.status(404).json({message: 'Houston, we have a problem! Message not found.'});
        }
        res.status(200).json({message: 'Message deleted. You won\'t see it again'});
    } catch (error) {
        console.error('Error deleting the message... Hmm, that\'s not good.', error);
        res.status(500).json({message: 'Error deleting the message... Hmm, that\'s not good my friend.'});
    }
}