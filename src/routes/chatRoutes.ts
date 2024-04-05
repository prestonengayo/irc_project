import { Router, Request, Response } from 'express';
import { getMessagesBetweenDates, getUserMessages, showChat, sendMessage, showPrivateChat, getAllMessages } from '../controllers/chatController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/', showChat);
router.get('/private', showPrivateChat);
router.get('/user-all-mes/:userId', getUserMessages );
router.get('/chat-between-dates/:userId', getMessagesBetweenDates);
router.get('/all', getAllMessages);
export default router;
