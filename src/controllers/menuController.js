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

// Crear un nuevo menú
const createMenu = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newMenu = await menuModel.createMenu(name, description);
    res.status(201).json(newMenu);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Error al crear el menú');
  }
};

export const menuController = {
  getAllMenus,
  getMenuById,
  createMenu,
};
