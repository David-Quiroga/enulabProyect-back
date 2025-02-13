import { pool } from "../db.js";

// Obtener todos los platos de un menú específico
const findAllDishes = async (menuId) => {
  const { rows } = await pool.query("SELECT * FROM dishes WHERE menu_id = $1", [menuId]);
  return rows;
};

// Obtener un plato específico por ID
const findDishById = async (menuId, id) => {  // Cambio aquí
  const { rows } = await pool.query("SELECT * FROM dishes WHERE menu_id = $1 AND id = $2", [menuId, id]);  // Cambio aquí
  return rows[0] || null;
};

// Crear un nuevo plato
const createDish = async (menuId, name, description, price) => {
  const query = "INSERT INTO dishes (menu_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
  try {
    const { rows } = await pool.query(query, [menuId, name, description, price]);
    return rows[0];
  } catch (error) {
    console.error("Error al crear plato:", error);
    throw error;
  }
};

// Actualizar un plato por ID
const updateDish = async (menuId, id, name, description, price) => {  // Cambio aquí
  const query = "UPDATE dishes SET name = $1, description = $2, price = $3 WHERE menu_id = $4 AND id = $5 RETURNING *";
  try {
    const { rows } = await pool.query(query, [name, description, price, menuId, id]);  // Cambio aquí
    return rows[0] || null;
  } catch (error) {
    console.error("Error al actualizar plato:", error);
    throw error;
  }
};

// Eliminar un plato por ID
const deleteDish = async (menuId, id) => {  // Cambio aquí
  const query = "DELETE FROM dishes WHERE menu_id = $1 AND id = $2 RETURNING *";
  const { rows } = await pool.query(query, [menuId, id]);  // Cambio aquí
  return rows[0] || null;
};

export const dishesModel = {
  findAllDishes,
  findDishById,
  createDish,
  updateDish,
  deleteDish,
};
