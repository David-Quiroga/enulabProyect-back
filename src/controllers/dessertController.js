import { dessertModel } from '../models/dessertModels.js';

// Obtener todos los postres de un menú específico
const getDessertsByMenuId = async (req, res) => {
  try {
    const desserts = await dessertModel.findDessertsByMenuId(req.params.menuId);
    res.json(desserts);
  } catch (err) {
    res.status(500).send('Error al obtener los postres');
  }
};

// Crear un nuevo postre
const createDessert = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newDessert = await dessertModel.createDessert(req.params.menuId, name, description, price);
    res.status(201).json(newDessert);
  } catch (err) {
    res.status(500).send('Error al crear el postre');
  }
};

export const dessertController = {
  getDessertsByMenuId,
  createDessert,
};
