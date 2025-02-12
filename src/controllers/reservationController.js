import { reservationsModel } from '../models/reservationModels.js';

// Obtener todas las reservas de un restaurante
const getReservationsByRestId = async (req, res) => {
    try {
        const reservations = await reservationsModel.findReservationsByRestId(req.params.restaurantId);
        res.json(reservations);
    } catch (error) {
        res.status(500).send('Error al obtener las reservas');
    }
};

// Obtener una reserva por ID
const getReservationById = async (req, res) => {
    const { restaurantId, id } = req.params;
    try {
        const reservation = await reservationsModel.findReservationById(restaurantId, id);
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).send('Reserva no encontrada');
        }
    } catch (error) {
        res.status(500).send('Error al obtener la reserva');
    }
};

// Crear una nueva reserva
const createReservation = async (req, res) => {
    const { name, date, hour, numcontact, pay } = req.body;
    const {restaurantId} = req.params;

    if (!restaurantId || !name || !date || !hour || !numcontact) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        const newReservation = await reservationsModel.createReservation(
            restaurantId,
            name,
            date,
            hour,
            numcontact,
            pay
        );
        res.status(201).json(newReservation);
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ error: "Error al crear la reserva" });
    }
};

// Actualizar una reserva por ID
const updateReservation = async (req, res) => {
    const { restaurantId, id } = req.params;
    const { name, date, hour, numcontact, pay } = req.body;

    if (!restaurantId || !id) {
        return res.status(400).json({ error: "El restaurantId y el id de la reserva son requeridos" });
    }

    try {
        const updatedReservation = await reservationsModel.updateReservation(
            restaurantId,
            id,
            name,
            date,
            hour,
            numcontact,
            pay
        );

        if (updatedReservation) {
            res.json(updatedReservation);
        } else {
            res.status(404).json({ error: "Reserva no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        res.status(500).json({ error: "Error al actualizar la reserva" });
    }
};

// Eliminar una reserva por ID
const deleteReservation = async (req, res) => {
    const { restaurantId, id } = req.params;
    try {
        const deletedReservation = await reservationsModel.deleteReservation(restaurantId, id);
        if (deletedReservation) {
            res.json({ message: 'Reserva eliminada', deletedReservation });
        } else {
            res.status(404).send('Reserva no encontrada');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar la reserva');
    }
};

export const reservationController = {
    getReservationsByRestId,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};
