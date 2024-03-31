import { Router, Request, Response } from 'express';
import { showChat, sendMessage, showPrivateChat, getAllMessages } from '../controllers/chatController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/', showChat);
router.get('/private', showPrivateChat);

router.get('/all', getAllMessages);
export default router;
