import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';
import menuRoutes from './routes/menuRoutes.js';
import dishRoutes from './routes/dishesRoutes.js';
import dessertRoutes from './routes/dessertRoutes.js';
import drinkRoutes from './routes/drinkRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import food_typeRoutes from './routes/food_typeRoutes.js';
import reserveRoutes from './routes/reservationRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import morgan from 'morgan';
import { whatsapp, whatsappReady, qrCodeData } from './whatsapp/whatsapp.js';;  // Ahora qrCode está exportado

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configura CORS para permitir solicitudes desde tu frontend
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:9000']  // Frontend corriendo en el puerto 3000
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

// Ruta para enviar el código QR generado
app.get('/api/qr', (req, res) => {
    if (qrCodeData) {
        return res.json({ qr: qrCodeData }); // Enviar el QR almacenado
    } else {
        return res.status(400).json({ success: false, message: 'QR aún no generado' });
    }
});

// Rutas para las API
app.use('/api', menuRoutes);
app.use('/api', dishRoutes);
app.use('/api', dessertRoutes);
app.use('/api', drinkRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', employeeRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', userRoutes);
app.use('/api', supplierRoutes);
app.use('/api', food_typeRoutes);
app.use('/api', reserveRoutes);
app.use('/api', commentRoutes);

// Ruta para servir archivos estáticos (como imágenes)
app.use('/img/usuario', express.static(path.join(__dirname, 'public/img/usuario')));

// Ruta para archivos estáticos generales (como CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

// Inicializa whatsapp cuando el servidor arranca
whatsapp.initialize();
