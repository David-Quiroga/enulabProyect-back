import { pool } from "../db.js";

// Obtener todos los menús de un restaurante
const findAllMenus = async (restaurantId) => {
  const { rows } = await pool.query(
    "SELECT * FROM menus WHERE restaurant_id = $1",
    [restaurantId]
  );
  return rows;
};

// Obtener un menú específico por ID
const findMenuById = async (restaurantId, menusId) => {
  const { rows } = await pool.query(
    "SELECT * FROM menus WHERE restaurant_id = $1 AND id = $2",
    [restaurantId, menusId]
  );
  return rows[0] || null;
};

// Crear un nuevo menú asociado a un restaurante
const createMenu = async (restaurantId, name, description) => {
  const query =
    "INSERT INTO menus (restaurant_id, name, description) VALUES ($1, $2, $3) RETURNING *";
  try {
    const { rows } = await pool.query(query, [restaurantId, name, description]);
    return rows[0];
  } catch (error) {
    console.error("Error al crear menú:", error);
    throw error;
  }
};

// Actualizar un menú por ID
const updateMenu = async (restaurantId, menusId, name, description) => {
  const query =
    "UPDATE menus SET name = $1, description = $2 WHERE restaurant_id = $3 AND id = $4 RETURNING *";
  try {
    const { rows } = await pool.query(query, [name, description, restaurantId, menusId]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error al actualizar el menú:", error);
    throw error;
  }
};

// Eliminar un menú por ID
const deleteMenu = async (restaurantId, menusId) => {
  const query = "DELETE FROM menus WHERE restaurant_id = $1 AND id = $2 RETURNING *";
  const { rows } = await pool.query(query, [restaurantId, menusId]);
  return rows[0] || null; // Devuelve el menú eliminado si existía
};

export const menuModel = {
  findAllMenus,
  findMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
