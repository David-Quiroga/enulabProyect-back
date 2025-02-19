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
    const { name, date, hour, numcontact, guests, note } = req.body;
    const { restaurantId } = req.params;
    // 🔹 Validación de datos obligatorios
    if (!restaurantId || !name || !date || !hour || !numcontact || !guests || !note ) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    try {
        // 🔹 Guardar la reserva en la base de datos
        const newReservation = await reservationsModel.createReservation(
            restaurantId,
            name,
            date,
            hour,
            numcontact,
            guests,
            note
        );
        // 🔹 Verificar que WhatsApp está listo
        if (!whatsappReady) {
            console.log("⚠️ WhatsApp no está listo, no se enviará el mensaje.");
            return res.status(201).json(newReservation);
        }
        // 🔹 Formatear el número de teléfono para WhatsApp
        const codigoPais = "593"; // Ajustar según el país
        const numeroLimpio = numcontact.replace(/\D/g, ""); // Elimina caracteres no numéricos
        const numeroFormateado = `${codigoPais}${numeroLimpio.substring(1)}@c.us`; // Formato internacional
        // 🔹 Verificar si el número está registrado en WhatsApp
        const isRegistered = await whatsapp.isRegisteredUser(numeroFormateado);
        if (isRegistered) {
            // 🔹 Enviar mensaje de confirmación de reserva
            await whatsapp.sendMessage(
                numeroFormateado,`🍽️ *Reserva Confirmada*\n👤 *Nombre:* ${name}\n📅 *Fecha:* ${date}\n⏰ *Hora:* ${hour}\n👥 *Personas:* ${guests}\n📝 *Nota:* ${note}\n\n¡Gracias por reservar con nosotros! 🎉. Pon 'confirmar' en minusculas`
            );
            console.log("✅ Mensaje enviado a:", numeroFormateado);
        } else {
            console.log("❌ Número no registrado en WhatsApp:", numeroFormateado);
        }
        // 🔹 Responder con la reserva creada
        res.status(201).json(newReservation);
        
    } catch (error) {
        console.error("❌ Error al crear la reserva:", error);
        res.status(500).json({ error: "Error al crear la reserva" });
    }
};


const updateReservation = async (req, res) => {
    const { restaurantId, id } = req.params;
    const { name, date, hour, numcontact, code, note, bank, confirmed } = req.body; // 🔹 Se añade confirmed

    try {
        const updatedReservation = await reservationsModel.updateReservation(
            restaurantId,
            id,
            name,
            date,
            hour,
            numcontact,
            code,
            note,
            bank,
            confirmed // 🔹 Se envía el estado de la confirmación
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
