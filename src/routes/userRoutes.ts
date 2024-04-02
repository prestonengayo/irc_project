import { Router, Request, Response } from 'express';
import { requestPasswordReset, handleLogin, showReset, getUserById, getAllUsers, createUser, deleteUser, updateUser } from '../controllers/userController';


const router = Router();

router.post('/login', handleLogin); // call this function when check user login info 

router.get('/reset', showReset);
router.post('/reset', requestPasswordReset);

router.post('/add', createUser);
router.get('/get/:userId', getUserById );
router.get('/all', getAllUsers);
router.delete('/del/:userId', deleteUser);
router.put('/set/:userId', updateUser);

export default router;

