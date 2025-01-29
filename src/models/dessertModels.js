import { pool } from "../db.js";

// Obtener todos los postres de un menú específico
const findDessertsByMenuId = async (menuId) => {
  const { rows } = await pool.query("SELECT * FROM desserts WHERE menu_id = $1", [menuId]);
  return rows;
};

// Crear un nuevo postre en un menú
const createDessert = async (menuId, name, description, price) => {
  const query = "INSERT INTO desserts (menu_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [menuId, name, description, price]);
  return rows[0];
};

export const dessertModel = {
  findDessertsByMenuId,
  createDessert,
};
