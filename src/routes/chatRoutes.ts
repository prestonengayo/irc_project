import { Router, Request, Response } from 'express';
import { getUserConversationsBetweenDatesController, getUserConversationsController, showChat, sendMessage, showPrivateChat, getAllMessages } from '../controllers/chatController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/', showChat);
router.get('/private', showPrivateChat);
router.get('/user-all-mes/:userId', getUserConversationsController );
router.get('/chat-between-dates/:userId', getUserConversationsBetweenDatesController);
router.get('/all', getAllMessages);
export default router;
