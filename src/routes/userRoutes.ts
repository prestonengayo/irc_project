import { Router} from 'express';
import { profilePageController, savePasswordController, renderResetPasswordPageController, registerUserController, handleLoginController,  passwordResetController, getUserById, getAllUsers, createUser, deleteUser, updateUser, askReset, handleLogoutController } from '../controllers/userController';


const router = Router();

router.post('/login', handleLoginController); 
router.get('/logout', handleLogoutController);
router.get('/ask-reset', askReset); 
router.post('/send-mail', passwordResetController); 
router.get('/reset/:token', renderResetPasswordPageController); 
router.post('/save-password', savePasswordController); 
router.get('/profile', profilePageController);



router.post('/add', createUser);
router.get('/get/:userId', getUserById );
router.get('/all', getAllUsers);
router.delete('/del/:userId', deleteUser);
router.put('/set/:userId', updateUser);

export default router;

