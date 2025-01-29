import express from 'express';
import { drinkController } from '../controllers/drinkController.js';

const router = express.Router();

// Rutas para Bebidas
router.get('/menus/:menuId/drinks', drinkController.getDrinksByMenuId);
router.post('/menus/:menuId/drinks', drinkController.createDrink);

export default router;
