import { pool } from '../db.js'

// Obtener todas las reservas de un restaurante
const findReservationsByRestId = async (restaurantId) => {
    const { rows } = await pool.query('SELECT * FROM reserve WHERE restaurant_id = $1', [restaurantId]);
    return rows;
};

// Obtener una reserva por ID
const findReservationById = async (restaurantId, reservationId) => {
    const { rows } = await pool.query('SELECT * FROM reserve WHERE restaurant_id = $1 AND id = $2', [restaurantId, reservationId]);
    return rows[0];
};

// Crear una nueva reserva en un restaurante
const createReservation = async (restaurantId, name, date, hour, numcontact, guests, note, code) => {
    const query = `
        INSERT INTO reserve (restaurant_id, name, date, hour, numcontact, guests, note, code) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [restaurantId, name, date, hour, numcontact, guests, note, code]);
        return rows[0];
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        throw error;
    }
};
/* const createReservation = async (restaurantId, name, date, hour, numcontact, pay, code, note) => {
    const query = `
        INSERT INTO reservations (restaurant_id, name, date, hour, numcontact, pay, code, note) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [restaurantId, name, date, hour, numcontact, pay, code, note]);
        return rows[0];
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        throw error;
    }
}; */

// Actualizar una reserva por ID
const updateReservation = async (restaurantId, reservationId, name, date, hour, numcontact, pay, code, note) => {
    const query = `
        UPDATE reservations 
        SET name = $1, date = $2, hour = $3, numcontact = $4, pay = $5, code = $6, note = $7
        WHERE restaurant_id = $8 AND id = $9 
        RETURNING *;
    `;

    const values = [name, date, hour, numcontact, pay, code, note, restaurantId, reservationId];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        throw error;
    }
};

// Eliminar una reserva por ID
const deleteReservation = async (restaurantId, reservationId) => {
    const query = 'DELETE FROM reservations WHERE restaurant_id = $1 AND id = $2 RETURNING *';
    const { rows } = await pool.query(query, [restaurantId, reservationId]);
    return rows[0];
};

export const reservationsModel = {
    findReservationsByRestId,
    findReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};
