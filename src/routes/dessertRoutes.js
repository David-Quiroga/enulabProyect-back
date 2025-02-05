import express from 'express';
import { dessertController } from '../controllers/dessertController.js';

const router = express.Router();

// Rutas para Postres (Desserts) dentro de un usuario, un restaurante y un menú
router.get('/menus/:menuId/desserts', dessertController.getDessertsByMenuId);
router.get('/menus/:menuId/desserts/:id', dessertController.getDessertById);
router.post('/menus/:menuId/desserts', dessertController.createDessert);
router.put('/menus/:menuId/desserts/:id', dessertController.updateDessert);
router.delete('/menus/:menuId/desserts/:id', dessertController.deleteDessert);

export default router;
