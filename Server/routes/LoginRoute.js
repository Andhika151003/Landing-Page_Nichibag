import express from 'express';
import { getUsers} from '../controller/LoginController.js';
const router = express.Router();

router.get('/Users', getUsers);

export default router;