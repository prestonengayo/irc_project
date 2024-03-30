import { Router, Request, Response } from 'express';
import { handleLogin, handleRegistration, showReset, getUserById, getAllUsers, createUser, deleteUser, updateUser } from '../controllers/userController';


const router = Router();

router.post('/login', handleLogin); // call this function when check user login info 
router.post('/checkRegistration', handleRegistration); // call this function when check user registration info

router.get('/reset', showReset);

router.post('/add', createUser);
router.get('/get/:userId', getUserById );
router.get('/all', getAllUsers);
router.delete('/del/:userId', deleteUser);
router.put('/set/:userId', updateUser);

export default router;
