/* import { pool } from '../db.js'

//Obtener todas las reservas del restaurante
const findReserveByRestId = async (restaurantId) => {
    const { rows } = await pool.query('SELECT * FROM reserve WHERE restaurant_id = $1', [restaurantId])
    return rows
}

//Obtener un restaurante por ID
const findReserveById = async (restaurantId, reserveId) => {
    const { rows } = await pool.query('SELECT * FROM reserve WHERE restaurant_id = $1 AND id = $2', [restaurantId, reserveId])
    return rows
}

//Crear un nuevo restaurante en un restaurante
const createReserve = async (restaurantId, name, date, people, comments) => {
    const query = 'INSERT INTO reserve (restaurant_id, name, date, people, comments) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const { rows } = await pool.query(query, [restaurantId, name, date, people, comments])
    return rows[0]
}

export const reserveModel = {
    findReserveByRestId,
    findReserveById,
    createReserve
} */