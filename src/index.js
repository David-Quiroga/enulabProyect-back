import express from 'express';
import { PORT } from './config.js';
import menuRoutes from './routes/menuRoutes.js';
import dishRoutes from './routes/dishesRoutes.js';
import dessertRoutes from './routes/dessertRoutes.js';
import drinkRoutes from './routes/drinkRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'
import listEndpoints from 'express-list-endpoints'; //!Se usa para ver los endpoints
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Rutas para las API
app.use('/api', menuRoutes);
app.use('/api', dishRoutes);
app.use('/api', dessertRoutes);
app.use('/api', drinkRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', employeeRoutes)
app.use('/api', inventoryRoutes)
app.use('/api', userRoutes)
app.use('/api', supplierRoutes)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
    console.log(listEndpoints(app)); //! Lista de las rutas
});
