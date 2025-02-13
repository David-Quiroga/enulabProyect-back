import express from 'express';
import { reservationController } from '../controllers/reservationController.js';
import { reservationsModel } from '../models/reservationModels.js';
import { whatsapp, whatsappReady } from '../whatsapp/whatsapp.js'; 
const router = express.Router();

// Rutas para las reservas
router.get('/restaurante/:restaurantId/reservations', reservationController.getReservationsByRestId);
router.get('/restaurante/:restaurantId/reservations/:id', reservationController.getReservationById);
router.post('/restaurante/:restaurantId/reservations', async (req, res) => {
    try {
        // Asegurarse de que WhatsApp esté listo
        if (!whatsappReady) {
            return res.status(500).json({ success: false, message: "WhatsApp aún no está listo" });
        }

        // Obtener los datos del formulario
        const { name, date, hour, numcontact, guests, note, code } = req.body;
        const { restaurantId } = req.params;

        // Verificar si los campos son válidos
        if (!restaurantId || !name || !date || !hour || !numcontact || !guests || !note || !code) {
            return res.status(400).json({ success: false, message: "Todos los campos son requeridos" });
        }

        // Guardar la reserva en la base de datos (asegúrate de que el modelo esté importado)
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

        // Usar el primer campo disponible, note o mensaje
        const mensajeFinal = note;

        // Formatear el número de teléfono
        const chatId = numcontact.replace(/\D/g, "").substring(1) + "@c.us";

        // Verificar si el número está registrado en WhatsApp
        const isRegistered = await whatsapp.isRegisteredUser(chatId);

        if (isRegistered) {
            // Enviar el mensaje final por WhatsApp
            await whatsapp.sendMessage(chatId, `Hola ${name}, tu reserva para ${date} a las ${hour} ha sido confirmada. Nota: ${mensajeFinal}`);
            return res.json({ success: true, message: "Reserva creada y mensaje enviado correctamente", reservation: newReservation });
        } else {
            return res.status(400).json({ success: false, message: "Número no registrado en WhatsApp" });
        }
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        return res.status(500).json({ success: false, message: "Error al crear la reserva o enviar el mensaje" });
    }
});
router.put('/restaurante/:restaurantId/reservations/:id', reservationController.updateReservation);
router.delete('/restaurante/:restaurantId/reservations/:id', reservationController.deleteReservation);

export default router;
