import { Router, Request, Response } from 'express';
import { exportUserConversationsAsCSVController, exportChatBetweenAsCSVController, showChat, sendMessage, showPrivateChat, getAllMessages } from '../controllers/chatController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/', showChat);
router.get('/private', showPrivateChat);
router.post('/save-between', exportChatBetweenAsCSVController);
router.post('/save_all', exportUserConversationsAsCSVController );

router.get('/all', getAllMessages);
export default router;
