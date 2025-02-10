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
const createSupplier = async (restaurantId,namesupplier, numcontact, email, direction, city, country) => {
    const query = "INSERT INTO suppliers (restaurant_id,namesupplier, numcontact, email, direction, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const { rows } = await pool.query(query, [restaurantId,namesupplier, numcontact, email, direction, city, country]);
    return rows[0];
};

// Actualizar un proveedor por ID
const updateSupplier = async (restaurantId,idSupplier, namesupplier, numcontact, email, direction, city, country) => {
    const query = 
    `UPDATE suppliers SET namesupplier = $1, numcontact = $2, 
    email = $3, direction = $4,city = $5, country = $6 WHERE  restaurant_id = $7 AND id = $8
    RETURNING *`;
    console.log('Ejecutando query de actualización:', query);

    const values = [ namesupplier, numcontact, email, direction, city, country,restaurantId, idSupplier]
    try{
        const {rows} = await pool.query(query, values)
        return rows[0] //devuelve el empleado actualizado
    } catch (error){
        console.log("Error en actualizar proveedores", error);
        throw error;
    }
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
