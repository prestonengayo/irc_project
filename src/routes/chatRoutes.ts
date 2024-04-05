import { Router, Request, Response } from 'express';
import { getUserConversationsBetweenDatesController, isAuthenticated,showCreateChannel, getUserConversationsController, getAllMessagesByChannelId, createMessage, showChat, sendMessage, showPrivateChat, getAllMessages } from '../controllers/chatController';


const router = Router();

router.post('/messages', createMessage);//
router.get('/', isAuthenticated, showChat);
router.get('/channels', isAuthenticated, showCreateChannel);
router.get('/private', showPrivateChat);
router.get('/user-all-mes/:userId', getUserConversationsController );
router.get('/chat-between-dates/:userId', getUserConversationsBetweenDatesController);
router.get('/all', getAllMessages);

router.get('/messages/:channelId', getAllMessagesByChannelId);


export default router;
