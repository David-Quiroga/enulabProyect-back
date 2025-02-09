import { employeeModel } from '../models/employeeModel.js';

//Obtener todos los empleado de un restaurante
const getEmployeeByRestId = async(req, res) => {
    try {
        const employees = await employeeModel.findEmployeeByRestId(req.params.restaurantId)
        res.json(employees);
    } catch (error) {
        res.status(500).send('Error al obtener el empleado')
    }
}

//Obtener un empleado por ID
const getEmployeeById = async (req, res) => {
    const { restaurantId, id} = req.params
    try {
        const employee = await employeeModel.findEmployeeById(restaurantId, id)
        if (employee) {
            res.json(employee)
        } else {
            res.status(404).send('Empleado no encontrado')
        }
    } catch (error) {
        res.status(500).send('Error al obtener el empleado')
    }
}

//Crear un empleado
const createEmployee = async (req, res) => {
    const { name, cedula, edad, genero, sueldo, telefono, horario } = req.body;
    const restaurantId = req.params.restaurantId; // Obtener el restaurantId desde los parámetros de la URL

    // Validar que todos los datos necesarios estén presentes
    if (!restaurantId || !name || !cedula || !edad || !genero || !sueldo || !telefono || !horario) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Crear el empleado utilizando el modelo
        const newEmployee = await employeeModel.createEmployee(
            restaurantId, name, cedula, edad, genero, sueldo, telefono, horario
        );

        // Responder con el nuevo empleado creado
        res.status(201).json(newEmployee);
    } catch (error) {
        console.log('Error al crear el empleado', error);
        res.status(500).send({ error: 'Error al crear el empleado' });
    }
};


//Actualizar el empleado por id
const updateEmployee = async (req, res) => {
    const { restaurantId, id } = req.params
    const { name, cedula, edad, genero, sueldo, telefono, horario } = req.body
    try {
        const updateEmployee = await employeeModel.updateEmployee(restaurantId, id, name, cedula, edad, genero, sueldo, telefono, horario)
        console.log(updateEmployee)
        if (updateEmployee) {
            res.json(updateEmployee)
        } else {
            res.status(404).send('Empleado no encontrado')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al actualizar el empleado')
    }
}

//Eliminar empleado por id
const deleteEmployee = async (req, res) => {
    const { restaurantId, id } = req.params
    try {
        const deleteEmployee = await employeeModel.deleteEmployee(restaurantId, id)
        if (deleteEmployee) {
            res.json({message: 'Empleado eliminado', deleteEmployee})
        } else {
            res.status(404).send('Empleado no encontrado')
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el empleado')
    }
}

export const employeeController = {
    getEmployeeByRestId,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}