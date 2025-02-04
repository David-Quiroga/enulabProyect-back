import { menuModel } from '../models/menuModels.js';

// Obtener todos los menús
const getAllMenus = async (req, res) => {
  try {
    const menus = await menuModel.findAllMenus();
    res.json(menus);
  } catch (err) {
    res.status(500).send('Error al obtener los menús');
  }
};

// Obtener un menú específico por ID
const getMenuById = async (req, res) => {
  try {
    const menu = await menuModel.findMenuById(req.params.id);
    if (menu) {
      res.json(menu);
    } else {
      res.status(404).send('Menú no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error al obtener el menú');
  }
};


// Obtener menús de un restaurante específico // es solo para provar si los menus pertecen a un restaurante no borrar
const getMenusByRestaurant = async (req, res) => {
  try {
      const menus = await menuModel.findMenusByRestaurant(req.params.restaurant_id);
      res.json(menus);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los menús');
  }
};


// Crear un nuevo menú
//const createMenu = async (req, res) => {
//  const { name, description } = req.body;
//  try {
//    const newMenu = await menuModel.createMenu(name, description);
//    res.status(201).json(newMenu);
//  } catch (err) {
//    console.error(err); 
//    res.status(500).send('Error al crear el menú');
//  }
//};

// Crear un nuevo menú
const createMenu = async (req, res) => {
  const { name, description, restaurant_id } = req.body;
  try {
      const newMenu = await menuModel.createMenu(name, description, restaurant_id);
      res.status(201).json(newMenu);
  } catch (err) {
      console.error(err); 
      res.status(500).send('Error al crear el menú');
  }
};

// Actualizar un menú por ID
const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedMenu = await menuModel.updateMenu(id, name, description);
    if (updatedMenu) {
      res.json(updatedMenu);
    } else {
      res.status(404).send('Menú no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el menú');
  }
};

// Eliminar un menú por ID
const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenu = await menuModel.deleteMenu(id);
    if (deletedMenu) {
      res.json({ message: 'Menú eliminado exitosamente', deletedMenu });
    } else {
      res.status(404).send('Menú no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el menú');
  }
};

export const menuController = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenusByRestaurant 
};