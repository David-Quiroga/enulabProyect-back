import { pool } from '../db.js';

// Obtener todos los tipos de comida de un restaurante
const findFoodTypesByRestId = async (menuId) => {
    const { rows } = await pool.query('SELECT * FROM food_type WHERE menu_id = $1', [menuId]);
    return rows;
};

// Obtener un tipo de comida por ID
const findFoodTypeById = async (menuId, foodTypeId) => {
    const { rows } = await pool.query('SELECT * FROM food_type WHERE menu_id = $1 AND id = $2', [menuId, foodTypeId]);
    return rows[0];
};

// Crear un nuevo tipo de comida en un restaurante
const createFoodType = async (menuId, name_type, state = true, descripcion) => {
    const query = 'INSERT INTO food_type (menu_id, name_type, state, descripcion) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(query, [menuId, name_type, state, descripcion]);
    return rows[0];
};

// Actualizar un tipo de comida por ID
const updateFoodType = async (menuId, foodTypeId, name_type, state, descripcion) => {
    const query = `
    UPDATE food_type 
    SET name_type = $1, state = $2, descripcion = $3 
    WHERE menu_id = $4 AND id = $5 
    RETURNING *`;

    const values = [name_type, state, descripcion, menuId, foodTypeId];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Error en updateFoodType:", error);
        throw error;
    }
};

// Eliminar un tipo de comida por ID
const deleteFoodType = async (menuId, foodTypeId) => {
    const query = 'DELETE FROM food_type WHERE menu_id = $1 AND id = $2 RETURNING *';
    const { rows } = await pool.query(query, [menuId, foodTypeId]);
    return rows[0];
};

export const foodTypeModel = {
    findFoodTypesByRestId,
    findFoodTypeById,
    createFoodType,
    updateFoodType,
    deleteFoodType
};
