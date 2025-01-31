import { pool } from '../db.js'

//Obtener todos los empleados del restaurante
const findEmployeeByRestId = async (restaurantId) => {
    const { rows } = await pool.query('SELECT * FROM employee WHERE restaurant_id = $1', [restaurantId])
    return rows;
};

//Obtener un empleado por iD
const findEmployeeById = async (restaurantId, employeeId) => {
    const { rows } = await pool.query('SELECT * FROM employee WHERE restaurant_id = $1 AND id = $2', [restaurantId, employeeId])
    return rows[0]
}

//Crear un nuevo empleado en un restaurante
const createEmployee = async (restaurantId, name, cedula, edad, genero, sueldo, telefono, horario) => {
    const query = 'INSERT INTO employee (restaurant_id, name, cedula, edad, genero, sueldo, telefono, horario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * '
    const { rows } = await pool.query(query, [restaurantId, name, cedula, edad, genero, sueldo, telefono, horario ])
    return rows[0]
}

//Actualizar una bebida por ID
const updateEmployee = async (restaurantId, employeeId, name, cedula, edad, genero, sueldo, telefono, horario) => {
    const query = `
    UPDATE employee 
    SET name = $1, cedula = $2, edad = $3, genero = $4, sueldo = $5, telefono = $6, horario = $7 
    WHERE restaurant_id = $8 AND id = $9 
    RETURNING *`;

const values = [name, cedula, edad, genero, sueldo, telefono, horario, restaurantId, employeeId];


    try {
        const { rows } = await pool.query(query, values);
        return rows[0];  // Devuelve el empleado actualizado
    } catch (error) {
        console.error("Error en updateEmployee:", error);
        throw error;
    }
};



//Eliminar un empleado por id
const deleteEmployee = async (restaurantId, employeeId) => {
    const query = 'DELETE FROM employee WHERE restaurant_id = $1 AND id = $2 RETURNING *'
    const { rows } = await pool.query(query, [restaurantId, employeeId])
    return rows[0]
}

export const employeeModel = {
    findEmployeeByRestId,
    findEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}