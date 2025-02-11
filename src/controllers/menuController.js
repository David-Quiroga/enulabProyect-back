import { menuModel } from '../models/menuModels.js';

// Obtener todos los menús de un restaurante
const getAllMenus = async (req, res) => {
  try {
    const menus = await menuModel.findAllMenus(req.params.restaurantId);
    res.json(menus);
  } catch (err) {
    console.error('Error al obtener los menús:', err);
    res.status(500).json({ error: 'Error al obtener los menús' });
  }
};

// Obtener un menú específico por ID
const getMenuById = async (req, res) => {
  const { restaurantId, id } = req.params;
  try {
    const menu = await menuModel.findMenuById(restaurantId, id);
    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ error: 'Menú no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el menú:', err);
    res.status(500).json({ error: 'Error al obtener el menú' });
  }
};

// Crear un nuevo menú
const createMenu = async (req, res) => {
  const { name, description } = req.body;
  const { restaurantId } = req.params;

  if (!restaurantId || !name || !description) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const newMenu = await menuModel.createMenu(restaurantId, name, description);
    res.status(201).json(newMenu);
  } catch (err) {
    console.error('Error al crear el menú:', err);
    res.status(500).json({ error: 'Error al crear el menú' });
  }
};

// Actualizar un menú por ID
const updateMenu = async (req, res) => {
  const { restaurantId, id } = req.params;
  const { name, description } = req.body;

  if (!restaurantId || !id) {
    return res.status(400).json({ error: 'El restaurantId y el id del menú son requeridos' });
  }

  try {
    const updatedMenu = await menuModel.updateMenu(restaurantId, id, name, description);
    if (updatedMenu) {
      res.json(updatedMenu);
    } else {
      res.status(404).json({ error: 'Menú no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar el menú:', err);
    res.status(500).json({ error: 'Error al actualizar el menú' });
  }
};

// Eliminar un menú por ID
const deleteMenu = async (req, res) => {
  const { restaurantId, id } = req.params;

  try {
    const deletedMenu = await menuModel.deleteMenu(restaurantId, id);
    if (deletedMenu) {
      res.json({ message: 'Menú eliminado exitosamente', deletedMenu });
    } else {
      res.status(404).json({ error: 'Menú no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el menú:', err);
    res.status(500).json({ error: 'Error al eliminar el menú' });
  }
};

export const menuController = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
