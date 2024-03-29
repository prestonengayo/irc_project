import * as indexController from '../controllers/indexController';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

router.post('/add', indexController.createChannel); // ADD
router.get('/all', indexController.getAllChannels); // ALL
router.get('/ch/:channelId', indexController.getChannelById); // GET ONE
router.put('/set/:channelId', indexController.updateChannel); // UPDATE
router.delete('/del/:channelId',indexController.deleteChannel ); // DELETE

export default router;
