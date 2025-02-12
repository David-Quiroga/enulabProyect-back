import express from 'express';
import { reservationController } from '../controllers/reservationController.js';

const router = express.Router();

// Rutas para las reservas
router.get('/restaurante/:restaurantId/reservations', reservationController.getReservationsByRestId);
router.get('/restaurante/:restaurantId/reservations/:id', reservationController.getReservationById);
router.post('/restaurante/:restaurantId/reservations', reservationController.createReservation);
router.put('/restaurante/:restaurantId/reservations/:id', reservationController.updateReservation);
router.delete('/restaurante/:restaurantId/reservations/:id', reservationController.deleteReservation);

export default router;
