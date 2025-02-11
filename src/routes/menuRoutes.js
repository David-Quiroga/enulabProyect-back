import express from 'express';
import { menuController } from '../controllers/menuController.js';

const router = express.Router();

// Rutas para Menú
router.get('/restaurante/:restaurantId/menus', menuController.getAllMenus);
router.get('/restaurante/:restaurantId/menus/:id', menuController.getMenuById);
router.post('/restaurante/:restaurantId/menus', menuController.createMenu);
router.put('/restaurante/:restaurantId/menus/:id', menuController.updateMenu);
router.delete('/restaurante/:restaurantId/menus/:id', menuController.deleteMenu);

export default router;
