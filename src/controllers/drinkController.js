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

// Obtener una bebida por ID
const getDrinkById = async (req, res) => {
  const { menuId, id } = req.params;
  try {
    const drink = await drinkModel.findDrinkById(menuId, id);
    if (drink) {
      res.json(drink);
    } else {
      res.status(404).send("Bebida no encontrada");
    }
  } catch (err) {
    res.status(500).send("Error al obtener la bebida");
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

// Actualizar una bebida por ID
const updateDrink = async (req, res) => {
  const { menuId, id } = req.params;
  const { name, description, price } = req.body;
  
  try {
    const updatedDrink = await drinkModel.updateDrink(menuId, id, name, description, price);
    if (updatedDrink) {
      res.json(updatedDrink);
    } else {
      res.status(404).send("Bebida no encontrada");
    }
  } catch (err) {
    res.status(500).send("Error al actualizar la bebida");
  }
};

// Eliminar una bebida por ID
const deleteDrink = async (req, res) => {
  const { menuId, id } = req.params;
  try {
    const deletedDrink = await drinkModel.deleteDrink(menuId, id);
    if (deletedDrink) {
      res.json({
        message: "Bebida eliminada exitosamente",
        deletedDrink,
      });
    } else {
      res.status(404).send("Bebida no encontrada");
    }
  } catch (err) {
    res.status(500).send("Error al eliminar la bebida");
  }
};

export const drinkController = {
  getDrinksByMenuId,
  getDrinkById,
  createDrink,
  updateDrink,
  deleteDrink
};
