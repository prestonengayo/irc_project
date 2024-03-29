import { Request, Response } from 'express';
import Channel from '../models/indexModel';
import { channel } from 'process';

  ////////////////
 //// CREATE //// 
////////////////

export const createChannel = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body; //{} extrait la valeur et stock dans les variable name et description
        const newChannel = new Channel({ name, description });
        const savedChannel = await newChannel.save();
        res.status(201).json(savedChannel);
    } catch (error) {
        console.error('Erreur lors de la création du canal :', error);
        res.status(500).json({ message: 'Erreur lors de la création du canal.' });
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
        console.error('Erreur lors de la récupération des Channels :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des Channels.' });
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
            return res.status(404).json({message: 'Wow ! On a un problème.. Channel non trouvé.'})
        }
        res.status(200).json(channel);
    } catch (error) {
        console.error('Erreur lors de la récupération du Channel :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du Channel.' });
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
            return res.status(404).json({message: 'Wow ! On a un problème.. Channel non trouvé.' });
        }
        res.status(200).json(updatedChannel);
    }catch (error) {
        console.error('Erreur lors de la mise à jour du Channel :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du Channel.' });
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
            return res.status(404).json({message: 'Wow ! On a un problème.. Channel non trouvé.'});
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du canal la .. Hmm C\'est pas bon ça ', error);
        res.status(500).json({message: 'Erreur lors de la suppression du canal amigo ..'});
    }
 };