import express from 'express';
import { dishController } from '../controllers/dishesController.js';

const router = express.Router();

// Rutas para Platos
router.get('/menus/:menuId/dishes', dishController.getDishesByMenuId);
router.post('/menus/:menuId/dishes', dishController.createDish);

export default router;
