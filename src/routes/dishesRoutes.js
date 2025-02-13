import express from 'express';
import { dishesController } from '../controllers/dishesController.js';

const router = express.Router();

// Rutas para Platos
router.get('/menus/:menuId/dishes', dishesController.getAllDishes); 
router.get('/menus/:menuId/dishes/:id', dishesController.getDishById);  // Cambio aquí
router.post('/menus/:menuId/dishes', dishesController.createDish);
router.put('/menus/:menuId/dishes/:id', dishesController.updateDish);  // Cambio aquí
router.delete('/menus/:menuId/dishes/:id', dishesController.deleteDish);  // Cambio aquí

export default router;
