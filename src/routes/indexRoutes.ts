
import { Router } from 'express';
import { showLoginForm, showRegistration, createChannel, getAllChannels, deleteChannel, getChannelById } from '../controllers/indexController';

const router = Router();

router.get('/', showLoginForm); // show login page 
router.get('/registration', showRegistration); // show registration page


router.post('/channels', createChannel);
router.get('/channels/all', getAllChannels);
router.delete('/channels/del/:channelId', deleteChannel);
router.get('/channels/:channelId', getChannelById);
export default router;
