import express from 'express'
import { reserveController } from '../controllers/reserveController.js'

const router = express.Router()

router.get('/restaurante/:restaurantId/reserve', reserveController.getReserveByRestId)
router.get('/restaurante/:restaurantId/reserve/:id', reserveController.getReserveById)
router.post('/restaurante/:restaurantId/reserve', reserveController.createReserve)

export default router