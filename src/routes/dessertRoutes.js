import express from 'express';
import { dessertController } from '../controllers/dessertController.js';

const router = express.Router();

// Rutas para Postres (Desserts) dentro de un usuario, un restaurante y un menú
router.get('/restaurante/:restaurantId/menus/:menuId/desserts', dessertController.getDessertsByMenuId);
router.get('/restaurante/:restaurantId/menus/:menuId/desserts/:id', dessertController.getDessertById);
router.post('/restaurante/:restaurantId/menus/:menuId/desserts', dessertController.createDessert);
router.put('/restaurante/:restaurantId/menus/:menuId/desserts/:id', dessertController.updateDessert);
router.delete('/restaurante/:restaurantId/menus/:menuId/desserts/:id', dessertController.deleteDessert);

export default router;
