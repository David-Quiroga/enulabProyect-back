import express from 'express';
import { reserveController } from '../controllers/reserveController.js';
import { whatsapp, whatsappReady } from '../whatsapp/whatsapp.js';  // Asegúrate de que esté importado correctamente

const router = express.Router();

router.get('/restaurante/:restaurantId/reserve', reserveController.getReserveByRestId);
router.get('/restaurante/:restaurantId/reserve/:id', reserveController.getReserveById);
router.post('/restaurante/:restaurantId/reserve', reserveController.createReserve);

router.post('/enviarMensaje', async (req, res) => {
    try {
        if (!whatsappReady) {
            return res.status(500).json({ success: false, message: "WhatsApp aún no está listo" });
        }

        const tel = '+5930985984150';
        const chatId = tel.substring(1) + "@c.us";

        const isRegistered = await whatsapp.isRegisteredUser(chatId);

        if (isRegistered) {
            const mensaje = "Testoy probando";
            await whatsapp.sendMessage(chatId, mensaje);
            return res.json({ success: true, message: "Mensaje enviado" });
        } else {
            return res.status(400).json({ success: false, message: "Número no registrado en WhatsApp" });
        }
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});

export default router;
