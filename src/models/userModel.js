import { pool } from '../db.js';
// Crear usuario
const createUser = async (nombreCompleto, correoElectronico, password, ruc, contacto) => {
    const query = 'INSERT INTO users (nombreCompleto, correoElectronico, password, ruc, contacto) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const { rows } = await pool.query(query, [nombreCompleto, correoElectronico, password, ruc, contacto]);
    return rows[0];
};

// Buscar usuario por correo electrónico
const findUserByEmail = async (correoElectronico) => {
    const query = 'SELECT * FROM users WHERE correoElectronico = $1';
    const { rows } = await pool.query(query, [correoElectronico]);
    return rows[0]; // Devuelve el primer usuario encontrado
};

export const userModel = {
    createUser,
    findUserByEmail,
};
