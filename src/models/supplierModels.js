// models/supplierModel.js
import { pool } from "../db.js";

// Obtener todos los proveedores
const findAllSuppliers = async (restaurantId) => {
    const { rows } = await pool.query("SELECT * FROM suppliers WHERE restaurant_id = $1", [restaurantId]);
    return rows;
};

// Obtener un proveedor por ID
const findSupplierById = async (restaurantId, idSupplier) => {
    const { rows } = await pool.query('SELECT * FROM suppliers WHERE  restaurant_id = $1 AND id = $2', [restaurantId,idSupplier]);
    return rows[0];
};

// Crear un nuevo proveedor
const createSupplier = async (restaurantId,nameSupplier, numContact, email, direction, city, country) => {
    const query = "INSERT INTO suppliers (restaurant_id,nameSupplier, numContact, email, direction, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const { rows } = await pool.query(query, [restaurantId,nameSupplier, numContact, email, direction, city, country]);
    return rows[0];
};

// Actualizar un proveedor por ID
const updateSupplier = async (restaurantId,idSupplier, nameSupplier, numContact, email, direction, city, country) => {
    const query = 
    `UPDATE suppliers SET nameSupplier = $3, numContact = $4, 
    email = $5, direction = $6,city = $7, country = $8 WHERE  restaurant_id = $1 AND id = $2
    RETURNING *`;
    console.log('Ejecutando query de actualización:', query);
    const { rows } = await pool.query(query, [restaurantId, idSupplier, nameSupplier, numContact, email, direction, city, country]);
    return rows[0];
};

// Eliminar un proveedor por ID
const deleteSupplier = async (restaurantId,idSupplier) => {
    const { rows} = await pool.query("DELETE FROM suppliers WHERE restaurant_id = $1 AND id = $2 RETURNING *", [restaurantId,idSupplier]);

    return rows [0];
};

export const supplierModel = {
    findAllSuppliers,
    findSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
