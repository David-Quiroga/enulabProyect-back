import { pool } from "../db.js";

// Obtener todas las bebidas de un menú específico
const findDrinksByMenuId = async (menuId) => {
  const { rows } = await pool.query("SELECT * FROM drinks WHERE menu_id = $1", [menuId]);
  return rows;
};

// Obtener una bebida por ID
const findDrinkById = async (menuId, drinkId) => {
  const { rows } = await pool.query("SELECT * FROM drinks WHERE menu_id = $1 AND id = $2", [menuId, drinkId]);
  return rows[0]; // Devuelve la bebida si la encuentra
};

// Crear una nueva bebida en un menú
const createDrink = async (menuId, name, description, price) => {
  const query = "INSERT INTO drinks (menu_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [menuId, name, description, price]);
  return rows[0];
};

// Actualizar una bebida por ID
const updateDrink = async (menuId, drinkId, name, description, price) => {
  const query = `
    UPDATE drinks 
    SET name = $3, description = $4, price = $5 
    WHERE menu_id = $1 AND id = $2
    RETURNING *`;
  const { rows } = await pool.query(query, [menuId, drinkId, name, description, price]);
  return rows[0]; // Devuelve la bebida actualizada
};

// Eliminar una bebida por ID
const deleteDrink = async (menuId, drinkId) => {
  const query = "DELETE FROM drinks WHERE menu_id = $1 AND id = $2 RETURNING *";
  const { rows } = await pool.query(query, [menuId, drinkId]);
  return rows[0]; // Devuelve la bebida eliminada si la encontró
};

export const drinkModel = {
  findDrinksByMenuId,
  findDrinkById,
  createDrink,
  updateDrink,
  deleteDrink 
};
