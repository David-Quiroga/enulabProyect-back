import express from 'express';
import { menuController } from '../controllers/menuController.js';

const router = express.Router();

// Rutas para menús asociados a un usuario y un restaurante
router.get('/menus', menuController.getMenusByRestaurant);
router.get('/menus/:id', menuController.getMenuById);
router.post('/menus', menuController.createMenu);
router.put('/menus/:id', menuController.updateMenu);
router.delete('/menus/:id', menuController.deleteMenu);

export default router;
