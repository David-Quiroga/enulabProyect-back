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
const createInventory = async (restaurantId, nombreProductos, estado, cantidad, categoria, descripcion) => {
    const query = 'INSERT INTO inventory (restaurant_id, nombreProductos, estado, cantidad, categoria, descripcion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const { rows } = await pool.query(query, [restaurantId, nombreProductos, estado, cantidad, categoria, descripcion]); // Orden correcto
    return rows[0];
};


// Actualizar un inventario por id
const updateInventory = async (restaurantId, inventoryId, nombreProductos, estado, cantidad, categoria, descripcion) => {
    const query = 'UPDATE inventory SET nombreProductos = $1, estado = $2, cantidad = $3, categoria = $4, descripcion = $5 WHERE restaurant_id = $6 AND id = $7 RETURNING *';
    const { rows } = await pool.query(query, [
        nombreProductos, estado, cantidad, categoria, descripcion, restaurantId, inventoryId // Orden correcto
    ]);
    return rows[0];
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