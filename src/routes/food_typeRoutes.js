import express from 'express';
import { foodTypeController } from '../controllers/food_typeController.js';

const router = express.Router();

// Rutas para tipos de comida
router.get('/menus/:menuId/food-type', foodTypeController.getFoodTypesByRestId);
router.get('/menus/:menuId/food-type/:id', foodTypeController.getFoodTypeById);
router.post('/menus/:menuId/food-type', foodTypeController.createFoodType);
router.put('/menus/:menuId/food-type/:id', foodTypeController.updateFoodType);
router.delete('/menus/:menuId/food-type/:id', foodTypeController.deleteFoodType);

export default router;
