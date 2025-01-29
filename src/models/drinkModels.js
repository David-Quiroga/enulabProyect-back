import { pool } from "../db.js";

// Obtener todas las bebidas de un menú específico
const findDrinksByMenuId = async (menuId) => {
  const { rows } = await pool.query("SELECT * FROM drinks WHERE menu_id = $1", [menuId]);

};

// Crear una nueva bebida en un menú
const createDrink = async (menuId, name, description, price) => {
  const query = "INSERT INTO drinks (menu_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [menuId, name, description, price]);
  return rows[0];
};

export const drinkModel = {
  findDrinksByMenuId,
  createDrink,
};
