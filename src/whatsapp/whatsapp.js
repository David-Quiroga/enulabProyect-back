import QRCode from 'qrcode';  // Asegúrate de usar el paquete correcto
import { Server } from 'socket.io';
import http from 'http';
import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;

// Configurar el servidor HTTP y WebSocket
const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // O la URL de tu frontend
        methods: ['GET', 'POST']
    }
});


let whatsappReady = false;
const whatsapp = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth(),
    webVersion: '2.2412.54',
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
});

// Función para generar el QR
let qrCodeData = null;
whatsapp.on('qr', async (qr) => {
    console.log('Código QR generado');
    try {
        // Genera el QR como DataURL
        const qrCodeData = await QRCode.toDataURL(qr);
        console.log('QR enviado:', qrCodeData); // Verifica que el QR es correcto
        io.emit('qr', qrCodeData); // Enviar QR al frontend
    } catch (error) {
        console.error('Error generando el QR:', error);
    }
});

whatsapp.on('disconnected', () => {
    console.log('⚠️ WhatsApp se desconectó');
    whatsappReady = false;
});

whatsapp.on('ready', () => {
    console.log("✅ WhatsApp está listo!");
    whatsappReady = true;
});

whatsapp.on('message_create', message => {
    const msg = message.body.trim().toLowerCase(); // Normaliza el texto

    if (msg === 'confirmar') {
        message.reply(
            '💳 *Nuestros Métodos de Pago* 💳\n\n' +
            '📌 Puedes realizar tu pago a cualquiera de las siguientes cuentas:\n\n' +
            '🏦 *Banco Pichincha*\n' +
            '💼 *Cuenta de Ahorro Transaccional*\n' +
            '🔢 *Número:* 2209093737\n' +
            '———————————————\n' +
            '🏦 *Banco del Pacífico*\n' +
            '💼 *Cuenta de Ahorro Transaccional*\n' +
            '🔢 *Número:* 1357924680\n\n' +
            '✅ Una vez realizado el pago, envíanos el comprobante y escribe *"pago realizado"* para confirmar tu reserva. ¡Gracias por tu preferencia! 😊'
        );
    } else if (msg === 'pago realizado') {
        message.reply(
            '✅ *Tu reserva ha sido confirmada.* 🎉\n\n' +
            '¡Gracias por tu pago! Te esperamos en nuestro restaurante. 🍽️😊'
        );
    }
});

// Iniciar servidor WebSocket
server.listen(3001, () => {
    console.log('🚀 Servidor WebSocket corriendo en http://localhost:3001');
});

export { whatsapp, whatsappReady, qrCodeData };