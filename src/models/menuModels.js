import {pool} from "../db.js"

// Obtener todos los menús
const findAllMenus = async () => {
    const { rows } = await pool.query("SELECT * FROM menus");
    return rows;
  };
  
  // Obtener un menú específico por ID
const findMenuById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM menus WHERE id = $1", [id]);
    return rows[0];
  };
  
  // Crear un nuevo menú
const createMenu = async (name, description) => {
    const query = "INSERT INTO menus (name, description) VALUES ($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [name, description]);
    return rows[0];
  };

  export const menuModel = {
    findAllMenus,
    findMenuById,
    createMenu,
  };