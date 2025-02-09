import express from 'express'
import { employeeController } from '../controllers/employeeController.js'

const router = express.Router()

//Rutas para empleados
router.get('/restaurante/:restaurantId/employee', employeeController.getEmployeeByRestId)
// Controlador para obtener empleados por restaurante
const getEmployeeByRestId = async (req, res) => {
    const { restaurantId } = req.params;
    try {
      // Aquí se obtienen los empleados del restaurante con el ID proporcionado
      const employees = await employeeModel.findEmployeeByRestId(restaurantId);
      res.json(employees); // Devolver empleados como JSON
    } catch (error) {
      res.status(500).send('Error al obtener los empleados');
    }
  };
  
router.get('/restaurante/:restaurantId/employee/:id', employeeController.getEmployeeById)
router.post('/restaurante/:restaurantId/employee', employeeController.createEmployee)
router.put('/restaurante/:restaurantId/employee/:id', employeeController.updateEmployee)
router.delete('/restaurante/:restaurantId/employee/:id', employeeController.deleteEmployee)

export default router
