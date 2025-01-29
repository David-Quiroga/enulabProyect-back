import { dishesModel } from '../models/dishesModels.js';

// Obtener todos los platos de un menú específico
const getDishesByMenuId = async (req, res) => {
  try {
    const dishes = await dishesModel.findDishesByMenuId(req.params.menuId);
    res.json(dishes);
  } catch (err) {
    res.status(500).send('Error al obtener los platos');
  }
};

// Crear un nuevo plato
const createDish = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newDish = await dishesModel.createDish(req.params.menuId, name, description, price);
    res.status(201).json(newDish);
  } catch (err) {
    res.status(500).sen
    console.error(err);('Error al crear el plato');
  }
};

export const dishController = {
  getDishesByMenuId,
  createDish,
};

