import express from 'express'
import { employeeController } from '../controllers/employeeController.js'

const router = express.Router()

//Rutas para empleados
router.get('/restaurante/:restaurantId/employee', employeeController.getEmployeeByRestId)
router.get('/restaurante/:restaurantId/employee/:id', employeeController.getEmployeeById)
router.post('/restaurante/:restaurantId/employee', employeeController.createEmployee)
router.put('/restaurante/:restaurantId/employee/:id', employeeController.updateEmployee)
router.delete('/restaurante/:restaurantId/employee/:id', employeeController.deleteEmployee)

export default router
