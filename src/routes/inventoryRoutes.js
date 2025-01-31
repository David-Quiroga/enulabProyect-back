import express from 'express';
import { inventoryController } from '../controllers/inventoryController.js';

const router = express.Router()

//Rutas para el inventario
router.get('/restaurante/:restaurantId/inventory', inventoryController.getInventoryByRestId)
router.get('/restaurante/:restaurantId/inventory/:id', inventoryController.getInventoryById)
router.post('/restaurante/:restaurantId/inventory', inventoryController.createInventory)
router.put('/restaurante/:restaurantId/inventory/:id', inventoryController.updateInventory)
router.delete('/restaurante/:restaurantId/inventory/:id', inventoryController.deleteInventory)

export default router