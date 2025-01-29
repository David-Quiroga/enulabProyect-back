import express from 'express';
import { menuController } from '../controllers/menuController.js';


const router = express.Router();

// Rutas para Menú
router.get('/menus', menuController.getAllMenus);
router.get('/menus/:id', menuController.getMenuById);
router.post('/menus', menuController.createMenu);

export default router;
