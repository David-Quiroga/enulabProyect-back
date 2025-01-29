import express from  'express'
import { PORT } from "./config.js"
import userRoutes from "./routes/userRoutes.js"
import listEndpoints from 'express-list-endpoints'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(userRoutes)

//! Lista de las rutas
app.listen(PORT)
console.log('Server on port', PORT)

console.log(listEndpoints(app));