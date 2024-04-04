import { Router, Request, Response } from 'express';
import { deleteChannel, showChat, isAuthenticated,showCreateChannel, showPrivateChat, getAllMessages, getAllMessagesByChannelId, createMessage } from '../controllers/chatController';

const router = Router();

router.post('/messages', createMessage);//
router.get('/', isAuthenticated, showChat);
router.get('/channels', isAuthenticated, showCreateChannel);
router.get('/del/:channelId', deleteChannel );
router.get('/private', showPrivateChat);

router.get('/all', getAllMessages);

router.get('/messages/:channelId', getAllMessagesByChannelId);


export default router;
