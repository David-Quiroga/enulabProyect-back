import { pool } from "../db.js";

// Obtener todos los postres de un menú específico
const findDessertsByMenuId = async (menuId) => {
  const { rows } = await pool.query("SELECT * FROM desserts WHERE menu_id = $1", [menuId]);
  return rows;
};

// Obtener un postre por ID
const findDessertById = async (menuId, id) => {
  const { rows } = await pool.query("SELECT * FROM desserts WHERE menu_id = $1 AND id = $2", [menuId, id]);
  return rows[0];
};

// Crear un nuevo postre en un menú
const createDessert = async (menuId, name, description, price) => {
  const query = "INSERT INTO desserts (menu_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [menuId, name, description, price]);
  return rows[0];
};

// Actualizar un postre
const updateDessert = async (menuId, id, name, description, price) => {
  const query = "UPDATE desserts SET name = $1, description = $2, price = $3 WHERE menu_id = $4 AND id = $5 RETURNING *";
  const { rows } = await pool.query(query, [name, description, price, menuId, id]);
  return rows[0];
};

// Eliminar un postre
const deleteDessert = async (menuId, id) => {
  const query = "DELETE FROM desserts WHERE menu_id = $1 AND id = $2 RETURNING *";
  const { rows } = await pool.query(query, [menuId, id]);
  return rows[0];
};

export const dessertModel = {
  findDessertsByMenuId,
  findDessertById,
  createDessert,
  updateDessert,
  deleteDessert,
};