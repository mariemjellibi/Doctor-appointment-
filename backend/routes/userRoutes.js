import express from 'express';
import { signupUser,loginUser, updateUser} from '../controllers/userControllers.js';
import  protectRoute  from '../middlewars/protectRoute.js';

const router = express.Router();
router.post('/signup', signupUser);
router.post('/login',loginUser);
router.put('/update',protectRoute,updateUser);
router.get('/profile', protectRoute, (req, res) => {
  // Assuming you want to return the user profile
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    phone: req.user.phone,
    isDoctor: req.user.isDoctor,
  });
});

export default router;