import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;

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
let qrCodeData = null; // Variable para almacenar el QR

whatsapp.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    qrCodeData = qr; // Guardamos el código QR
});

whatsapp.on('ready', () => {
    console.log('✅ WhatsApp está listo!');
    whatsappReady = true;
});

whatsapp.on('disconnected', () => {
    console.log('⚠️ WhatsApp se desconectó');
    whatsappReady = false;
});

export { whatsapp, whatsappReady, qrCodeData };
