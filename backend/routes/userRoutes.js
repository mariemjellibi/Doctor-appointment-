import express from 'express';
import { signupUser,loginUser, updateUser} from '../controllers/userControllers.js';
import  protectRoute  from '../middlewars/protectRoute.js';
const router = express.Router();
router.post('/signup', signupUser);
router.post('/login',loginUser);
router.put('/update',protectRoute,updateUser)
export default router;