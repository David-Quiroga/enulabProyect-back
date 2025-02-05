import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.createUser); // Registro
router.post('/login', userController.login); // Login
router.post('/validate-email', userController.validateEmail); // Validación de correo

export default router;
