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

// Obtener un plato por su ID
const findDishById = async (menuId, id) => {
  const { rows } = await pool.query("SELECT * FROM dishes WHERE menu_id = $1 AND id = $2", [menuId, id]);
  return rows[0];
};

// Actualizar un plato
const updateDish = async (menuId, id, name, description, price) => {
  const query = "UPDATE dishes SET name = $1, description = $2, price = $3 WHERE menu_id = $4 AND id = $5 RETURNING *";
  const { rows } = await pool.query(query, [name, description, price, menuId, id]);
  return rows[0];
};

// Eliminar un plato
const deleteDish = async (menuId, id) => {
  const query = "DELETE FROM dishes WHERE menu_id = $1 AND id = $2 RETURNING *";
  const { rows } = await pool.query(query, [menuId, id]);
  return rows[0]; // Retornamos el plato eliminado para confirmación
};

export const dishesModel = {
  findDishesByMenuId,
  findDishById,
  createDish,
  updateDish,
  deleteDish,
};