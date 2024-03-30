import { Router, Request, Response } from 'express';
import { handleLogin, handleRegistration, showReset } from '../controllers/userController';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/login', handleLogin); // call this function when check user login info 
router.post('/checkRegistration', handleRegistration); // call this function when check user registration info

router.get('/reset', showReset);


export default router;
