import { Router } from 'express';
import { addUser, getUsers } from '../controllers/userController';

const router = Router();

router.post('/', addUser);
router.get('/', getUsers);

export default router;
