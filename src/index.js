import express from  'express'
import { PORT } from "./config.js"
import userRoutes from "./routes/userRoutes.js"
import menuRoutes from './routes/menuRoutes.js';
import dishRoutes from './routes/dishesRoutes.js';
import dessertRoutes from './routes/dessertRoutes.js';
import drinkRoutes from './routes/drinkRoutes.js';

const app = express()

app.use(express.json()); 

// Rutas para usuarios
app.use('/api', userRoutes); // esto lo modifique para que veas el ejemplo
app.use('/api', menuRoutes);
app.use('/api', dishRoutes);
app.use('/api', dessertRoutes);
app.use('/api', drinkRoutes);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });