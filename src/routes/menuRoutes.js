import express from 'express';
import { menuController } from '../controllers/menuController.js';


const router = express.Router();

// Rutas para Menú
router.get('/menus', menuController.getAllMenus);
router.get('/menus/:id', menuController.getMenuById);
router.get('/restaurants/:restaurant_id/menus', menuController.getMenusByRestaurant);// es solo para provar si los menus pertecen a un restaurante no borrar
router.post('/menus', menuController.createMenu);
router.put('/menus/:id', menuController.updateMenu); 
router.delete('/menus/:id', menuController.deleteMenu);  


export default router;
