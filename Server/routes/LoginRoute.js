import express from 'express';
import { 
    getUsers,
    getUserById,
    saveUser,
    loginUser
} from '../controller/LoginController.js';
const router = express.Router();

router.get('/Users', getUsers);
router.get('/Users/:id', getUserById);
router.post('/Users', saveUser);
router.post('/login', loginUser); // ini mau tak push

export default router;