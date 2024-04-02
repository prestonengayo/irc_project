import { Router, Request, Response } from 'express';
import { savePassword, renderResetPasswordPage, passwordResetController, handleLogin, getUserById, getAllUsers, createUser, deleteUser, updateUser, askReset } from '../controllers/userController';


const router = Router();

router.post('/login', handleLogin); // call this function when check user login info 

router.get('/ask-reset', askReset); // ok
router.post('/send-mail', passwordResetController); // ok
router.get('/reset/:token', renderResetPasswordPage); // ok
router.post('/save-password', savePassword); // ok



router.post('/add', createUser);
router.get('/get/:userId', getUserById );
router.get('/all', getAllUsers);
router.delete('/del/:userId', deleteUser);
router.put('/set/:userId', updateUser);

export default router;

