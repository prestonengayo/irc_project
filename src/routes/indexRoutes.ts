
import { Router } from 'express';
import { showLoginForm, showRegistration } from '../controllers/indexController';

const router = Router();

router.get('/', showLoginForm); // show login page 
router.get('/registration', showRegistration); // show registration page


export default router;
