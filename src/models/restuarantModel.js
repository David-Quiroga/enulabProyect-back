import { pool } from "../db.js";

//! Obtener todos los restaurantes
const findAllRestaurant = async () => {
    const { rows } = await pool.query("SELECT * FROM restaurant")
    return rows;
}

//! Obtener el restaurante por id
const findRestaurantByid = async(id) => {
    const { rows } = await pool.query('SELECT * FROM restaurant WHERE id = $1', [id])
    return rows[0];
}

//!Crear un restaurante
const createRestaurante = async (name, ubicacion, objetivos, logo, descripcion) => {
    const query = "INSERT INTO restaurant (name, ubicacion, objetivos, logo, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    const { rows } = await pool.query(query, [ name, ubicacion, objetivos, logo, descripcion]);
    return rows[0]
}

//! Actualizar el restaurate por id
const updateRestaurante = async (id, name, ubicacion, objetivos, logo, descripcion) => {
    const query = "UPDATE restaurant SET name = $1, ubicacion = $2, objetivos = $3, logo = $4, descripcion = $5 WHERE id = $6 RETURNING *";
    const { rows } = await pool.query(query, [name, ubicacion, objetivos, logo, descripcion, id])
    return rows[0];
}

//! Eliminar por id
const deleteRestaurante = async (id) => {
    const query = "DELETE FROM restaurant WHERE id = $1 RETURNING *"
    const { rows } = await pool.query(query, [id])
    return rows[0] //!Devuelve el restaurante eliminado
}

export const restaurantModel = {
    findAllRestaurant,
    findRestaurantByid,
    createRestaurante,
    updateRestaurante,
    deleteRestaurante
}