import { reservationsModel } from '../models/reservationModels.js';
import { whatsapp, whatsappReady } from '../whatsapp/whatsapp.js';

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
    const { name, date, hour, numcontact, guests, note, code } = req.body;
    const { restaurantId } = req.params;

    // Validación de campos requeridos
    if (!restaurantId || !name || !date || !hour || !numcontact || !guests || !note || !code) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // Primero, guarda la reserva en la base de datos
        const newReservation = await reservationsModel.createReservation(
            restaurantId,
            name,
            date,
            hour,
            numcontact,
            guests,
            note,
            code
        );

        // Enviar el mensaje de confirmación al número proporcionado (usando 'note' directamente)
        const chatId = numcontact.replace(/\D/g, "").substring(1) + "@c.us";

        // Verificar si el número está registrado en WhatsApp
        const isRegistered = await whatsapp.isRegisteredUser(chatId);

        if (isRegistered) {
            // Usamos directamente 'note' para enviar el mensaje de confirmación
            await whatsapp.sendMessage(chatId, `Hola ${name}, tu reserva para ${date} a las ${hour} ha sido confirmada. Nota: ${note}`);
        } else {
            console.error("Número no registrado en WhatsApp");
        }

        // Después de enviar el mensaje, respondemos con la nueva reserva
        res.status(201).json(newReservation);
        
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ error: "Error al crear la reserva" });
    }
};


/* 

// Función para enviar mensaje a WhatsApp
const enviarMensaje = async (numcontact, note) => {
    if (!whatsappReady) {
        console.log("WhatsApp aún no está listo");
        return;
    }

    const chatId = telefono.replace(/\D/g, "").substring(1) + "@c.us"; // Formato correcto
    const isRegistered = await whatsapp.isRegisteredUser(chatId);

    if (isRegistered) {
        await whatsapp.sendMessage(chatId, note);
        console.log(`Mensaje enviado a ${numcontact}`);
    } else {
        console.log(`Número ${numcontact} no está registrado en WhatsApp`);
    }
}; */

// Actualizar una reserva por ID
const updateReservation = async (req, res) => {
    const { restaurantId, id } = req.params;
    const { name, date, hour, numcontact, pay, code, note } = req.body;

    try {
        const updatedReservation = await reservationsModel.updateReservation(
            restaurantId,
            id,
            name,
            date,
            hour,
            numcontact,
            pay,
            code,
            note
        );
        if (updatedReservation) {
            res.json(updatedReservation);
        } else {
            res.status(404).send('Reserva no encontrada');
        }
    } catch (error) {
        res.status(500).send('Error al actualizar la reserva');
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
