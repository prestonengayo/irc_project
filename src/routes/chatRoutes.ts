import { Router, Request, Response } from 'express';
import { showChat, sendMessage, showPrivateChat } from '../controllers/chatController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/', showChat);
router.get('/private', showPrivateChat);


export default router;
