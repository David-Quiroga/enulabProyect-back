import express from 'express';
import { restaurantController } from '../controllers/restaurantController.js'
const router = express.Router()

//Rutas para el restaurante
router.get('/restaurante', restaurantController.findRestaurant);
router.get('/restaurante/:user_id', restaurantController.findRestaurantsByUserId)
router.post('/restaurante', restaurantController.createRestaurante)
router.put('/restaurante/:id', restaurantController.updateRestaurante)
router.delete('/restaurante/:id', restaurantController.deleteRestaurante)

export default router