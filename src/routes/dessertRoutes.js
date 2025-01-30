import express from 'express';
import { dessertController } from '../controllers/dessertController.js';

const router = express.Router();

// Rutas para Postres
router.get('/menus/:menuId/desserts', dessertController.getDessertsByMenuId);
router.post('/menus/:menuId/desserts', dessertController.createDessert);

export default router;
