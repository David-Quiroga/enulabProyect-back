import express from 'express';
import { dishController } from '../controllers/dishesController.js';

const router = express.Router();

// Rutas para Platos
router.get('/menus/:menuId/dishes', dishController.getDishesByMenuId); 
router.get('/menus/:menuId/dishes/:id', dishController.getDishById);
router.post('/menus/:menuId/dishes', dishController.createDish);
router.put('/menus/:menuId/dishes/:id', dishController.updateDish); 
router.delete('/menus/:menuId/dishes/:id', dishController.deleteDish);

export default router;
