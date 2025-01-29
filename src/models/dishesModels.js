import { pool } from "../db.js";

// Obtener todos los platos de un menú específico
const findDishesByMenuId = async (menuId) => {
  const { rows } = await pool.query("SELECT * FROM dishes WHERE menu_id = $1", [menuId]);
  return rows;
};

// Crear un nuevo plato en un menú
const createDish = async (menuId, name, description, price) => {
  const query = "INSERT INTO dishes (menu_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [menuId, name, description, price]);
  return rows[0];
};

export const dishesModel = {
  findDishesByMenuId,
  createDish,
};
