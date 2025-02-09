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
    const { restaurantId, id } = req.params; // Parámetros del URL
    const { name, cedula, edad, genero, sueldo, telefono, horario } = req.body; // Datos del cuerpo de la solicitud

    try {
        // Llamada al modelo para actualizar el empleado
        const updatedEmployee = await employeeModel.updateEmployee(restaurantId, id, name, cedula, edad, genero, sueldo, telefono, horario);
        
        // Verificar si se actualizó el empleado
        if (updatedEmployee) {
            res.json(updatedEmployee); // Retornar los datos del empleado actualizado
        } else {
            res.status(404).send('Empleado no encontrado');
        }
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        res.status(500).send('Error al actualizar el empleado');
    }
};

//Eliminar empleado por id
const deleteEmployee = async (req, res) => {
    const { restaurantId, id } = req.params; // Obtener restaurantId y id del empleado desde los parámetros de la URL

    try {
        // Llamada al modelo para eliminar el empleado
        const deletedEmployee = await employeeModel.deleteEmployee(restaurantId, id);

        // Verificar si se eliminó el empleado
        if (deletedEmployee) {
            res.json({ message: 'Empleado eliminado', deletedEmployee }); // Retornar el mensaje de eliminación
        } else {
            res.status(404).send('Empleado no encontrado');
        }
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        res.status(500).send('Error al eliminar el empleado');
    }
};


export const employeeController = {
    getEmployeeByRestId,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}