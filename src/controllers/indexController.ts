import { Request, Response } from 'express';
import Channel from '../models/indexModel';
import User from '../models/userModel';


  ////////////////////////////
 //// DISPLAY LOGIN PAGE //// 
////////////////////////////
export const showLoginForm = (req: Request, res: Response) => {
    res.render('index', { error: null }); 
};


  ///////////////////////////////////
 //// DISPLAY REGISTRATION PAGE //// 
///////////////////////////////////
export const showRegistration = async (req: Request, res: Response) => {
    res.render('registration', { error: null }); 
};

/////////////////////////////////// CRUD //////////////////////////////////

  ////////////////
 //// CREATE //// 
////////////////


export const createChannel = async (req: Request, res: Response) => {
    try {
        const { name, description, type, members } = req.body;

        let membersToAdd = Array.isArray(members) ? members : members ? [members] : [];
        
        // add userId to membersToAdd
        membersToAdd.push(req.session.userId);

        if (type === 'public_message') {
            const newChannel = new Channel({ 
                name, 
                description, 
                type
            });
            await newChannel.save();
            return res.redirect('/chat');
        } else {
            const newChannel = new Channel({ 
                name, 
                description, 
                type, 
                members: membersToAdd 
            });
            await newChannel.save();
            return res.redirect('/chat');
        }
    } catch (error) {
        console.error('Wow.. Error creating the channel :', error);
        return res.status(500).json({ message: 'Wow.. Error creating the channel.' });
    }
};


  ////////////////
 //// GET ALL ///
////////////////

export const getAllChannels = async (req: Request, res: Response) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    }catch (error) {
        console.error('Wow.. Error retrieving the channels:', error);
        res.status(500).json({ message: 'Wow.. Error retrieving the channels.' });
    }
};

  ////////////////////////
 //// GET ONE WITH ID ///
////////////////////////

export const getChannelById = async (req: Request, res: Response) => {
    try {
        const { channelId } = req.params;
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({message: 'Houston, we have a problem! Channel not found.'})
        }
        res.status(200).json(channel);
    } catch (error) {
        console.error('Wow.. Error retrieving the channel:', error);
        res.status(500).json({ message: 'Wow.. Error retrieving the channel' });
    }
};


  ///////////////
 //// UPDATE ///
///////////////

export const updateChannel = async (req: Request, res: Response) => {
    try {
        const  {channelId} = req.params;
        const updatedChannel = await Channel.findByIdAndUpdate(channelId, req.body, { new: true });
        if(!updatedChannel){
            return res.status(404).json({message: 'Houston, we have a problem! Channel not found.' });
        }
        res.status(200).json(updatedChannel);
    }catch (error) {
        console.error('You won\'t believe.. Error updating the channel', error);
        res.status(500).json({ message: 'You won\'t believe.. Error updating the channel' });
    }
}

  ///////////////
 //// DELETE ///
///////////////

 export const deleteChannel = async (req: Request, res: Response) => {
    try {
        const {channelId} = req.params;
        const deletedChannel = await Channel.findByIdAndDelete(channelId);
        if(!deletedChannel) {
            return res.status(404).json({message: 'Houston, we have a problem! Channel not found.'});
        }
        res.status(200).json({message: 'Channel deleted. You won\'t see it again'});
    } catch (error) {
        console.error('Error deleting the channel... Hmm, that\'s not good.', error);
        res.status(500).json({message: 'Error deleting the channel... Hmm, that\'s not good my friend.'});
    }
 };
