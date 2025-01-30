import express from 'express';
import { drinkController } from '../controllers/drinkController.js';

const router = express.Router();

// Rutas para Bebidas
router.get('/menus/:menuId/drinks', drinkController.getDrinksByMenuId);
router.get('/menus/:menuId/drinks/:id', drinkController.getDrinkById);
router.post('/menus/:menuId/drinks', drinkController.createDrink);
router.put('/menus/:menuId/drinks/:id', drinkController.updateDrink);
router.delete('/menus/:menuId/drinks/:id', drinkController.deleteDrink);

export default router;
