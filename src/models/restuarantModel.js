import { pool } from "../db.js";

//! Obtener todos los restaurantes
const findAllRestaurant = async () => {
    const { rows } = await pool.query("SELECT * FROM restaurant")
    return rows;
}

//! Obtener el restaurante por id
const findRestaurantByid = async(user_id) => {
    const { rows } = await pool.query('SELECT * FROM restaurant WHERE user_id = $1', [user_id])
    return rows;
}

//!Crear un restaurante
const createRestaurante = async (name, ubicacion, objetivos, logo, descripcion, user_id) => {
    const query = "INSERT INTO restaurant (name, ubicacion, objetivos, logo, descripcion, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const { rows } = await pool.query(query, [name, ubicacion, objetivos, logo, descripcion, user_id]);
    return rows[0];
};


//! Actualizar el restaurate por id
const updateRestaurante = async (id, name, ubicacion, objetivos, logo, descripcion) => {
    let query, values;

    if (logo) {
        // Si se envió una nueva imagen, actualizar todo
        query = "UPDATE restaurant SET name = $1, ubicacion = $2, objetivos = $3, logo = $4, descripcion = $5 WHERE id = $6 RETURNING *";
        values = [name, ubicacion, objetivos, logo, descripcion, id];
    } else {
        // Si NO se envió una nueva imagen, no modificar el campo logo
        query = "UPDATE restaurant SET name = $1, ubicacion = $2, objetivos = $3, descripcion = $4 WHERE id = $5 RETURNING *";
        values = [name, ubicacion, objetivos, descripcion, id];
    }

    const { rows } = await pool.query(query, values);
    return rows[0];
};


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