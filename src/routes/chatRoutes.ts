import { Router, Request, Response } from 'express';
import { sendMessage } from '../controllers/chatController';

const router = Router();

router.post('/messages', sendMessage);
router.get('/', (req: Request, res: Response) => {
    res.send('Get message');
});


export default router;
