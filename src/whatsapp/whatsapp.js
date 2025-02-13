import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;

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

// Definir una función para generar el QR
const qrCode = (qr) => {
    qrcode.generate(qr, { small: true });
};

let whatsappReady = false;

whatsapp.on('qr', qrCode);  // Usar qrCode aquí

whatsapp.on('ready', () => {
    console.log('Client is ready!');
    whatsappReady = true;
});

whatsapp.on('disconnected', () => {
    console.log('Client was logged out');
    whatsappReady = false;
});

// Exportar whatsapp y qrCode
export { whatsapp, qrCode, whatsappReady };
