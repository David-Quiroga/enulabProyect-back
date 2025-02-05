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
// Obtener menús por restaurante  // es solo para provar si los menus pertecen a un restaurante no borrar
const findMenusByRestaurant = async (restaurant_id) => {
  const { rows } = await pool.query("SELECT * FROM menus WHERE restaurant_id = $1", [restaurant_id]);
  return rows;
};
<<<<<<< HEAD
  
  // Crear un nuevo menú
//const createMenu = async (name, description) => {
 //   const query = "INSERT INTO menus (name, description) VALUES ($1, $2) RETURNING *";
 //   const { rows } = await pool.query(query, [name, description]);
// //   return rows[0];
 // };

=======
>>>>>>> david
  // Crear un nuevo menú asociado a un restaurante
const createMenu = async (name, description, restaurant_id) => {
  const query = "INSERT INTO menus (name, description, restaurant_id) VALUES ($1, $2, $3) RETURNING *";
  const { rows } = await pool.query(query, [name, description, restaurant_id]);
  return rows[0];
};


  // Actualizar un menú por ID
const updateMenu = async (id, name, description) => {
  const query = "UPDATE menus SET name = $1, description = $2 WHERE id = $3 RETURNING *";
  const { rows } = await pool.query(query, [name, description, id]);
  return rows[0];
};

// Eliminar un menú por ID
const deleteMenu = async (id) => {
  const query = "DELETE FROM menus WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0]; // Devuelve el menú eliminado si existía
};


  export const menuModel = {
    findAllMenus,
    findMenuById,
    createMenu,
    updateMenu,
    deleteMenu,
    findMenusByRestaurant
  };