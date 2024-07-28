import { Router } from 'express';
import { addUser, getUsers, setScore } from '../controllers/userController';

const router = Router();

router.post('/', addUser).get('/', getUsers);

router.post('/score', setScore);

export default router;
