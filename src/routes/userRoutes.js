import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.createUser); // Registro
router.post('/login', userController.login); // Login

export default router;
