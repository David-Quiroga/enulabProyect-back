import { drinkModel } from '../models/drinkModels.js';

// Obtener todas las bebidas de un menú específico
const getDrinksByMenuId = async (req, res) => {
  try {
    const drinks = await drinkModel.findDrinksByMenuId(req.params.menuId);
    res.json(drinks);
  } catch (err) {
    res.status(500).send('Error al obtener las bebidas');
  }
};

// Crear una nueva bebida
const createDrink = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newDrink = await drinkModel.createDrink(req.params.menuId, name, description, price);
    res.status(201).json(newDrink);
  } catch (err) {
    res.status(500).send('Error al crear la bebida');
  }
};

export const drinkController = {
  getDrinksByMenuId,
  createDrink,
};
