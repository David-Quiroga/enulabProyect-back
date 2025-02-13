import { pool } from '../db.js'

//Obtener todos los inventarios del restaurante
const findInventoryByRestId = async (restaurantId) => {
    const { rows } = await pool.query('SELECT * FROM inventory WHERE restaurant_id = $1', [restaurantId])
    return rows;
}

//Obtener un inventario por ID
const findInventoryById = async (restaurantId, inventoryId) => {
    const { rows } = await pool.query('SELECT * FROM inventory WHERE restaurant_id = $1 AND id = $2', [restaurantId, inventoryId])
    return rows[0]
}

// Crear un nuevo inventario en un restaurante
const createInventory = async (restaurantId, nombreproductos, cantidad, categoria, descripcion) => {
    const query = `
        INSERT INTO inventory (restaurant_id, nombreproductos, cantidad, categoria, descripcion) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
    `;
    try {
        const { rows } = await pool.query(query, [restaurantId, nombreproductos, cantidad, categoria, descripcion]);
        return rows[0];
    } catch (error) {
        console.error("Error al crear el inventario:", error);
        throw error;
    }
};

// Actualizar un inventario por ID
const updateInventory = async (restaurantId, inventoryId, nombreproductos, cantidad, categoria, descripcion) => {
    const query = `
        UPDATE inventory 
        SET nombreproductos = $1, cantidad = $2, categoria = $3, descripcion = $4 
        WHERE restaurant_id = $5 AND id = $6 
        RETURNING *;
    `;

    const values = [nombreproductos, cantidad, categoria, descripcion, restaurantId, inventoryId]; // Orden corregido

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Error al actualizar el inventario:", error);
        throw error;
    }
};


//Eliminar un inventario por id
const deleteInventory = async (restaurantId, inventoryId) => {
    const query = 'DELETE FROM inventory WHERE restaurant_id = $1 AND id = $2 RETURNING *'
    const { rows } = await pool.query(query, [restaurantId, inventoryId])
    return rows[0]
}

export const inventoryModel = {
    findInventoryByRestId,
    findInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
}