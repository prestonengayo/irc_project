import { Router, Request, Response } from 'express';
import { getUserMessages, showChat, sendMessage, showPrivateChat, getAllMessages } from '../controllers/chatController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/', showChat);
router.get('/private', showPrivateChat);
/*router.post('/save-between', exportChatBetweenAsCSVController);
router.post('/save-all', exportUserConversationsAsCSVController );*/
router.get('/user-all-mes/:userId', getUserMessages );
//router.get('/user-all-mes', getUserMessages );

router.get('/all', getAllMessages);
export default router;
