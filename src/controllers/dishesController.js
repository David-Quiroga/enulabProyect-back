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

// Obtener un plato por ID
const getDishById = async (req, res) => {
  try {
    const { menuId, id } = req.params;
    const dish = await dishesModel.findDishById(menuId, id);
    if (dish) {
      res.json(dish);
    } else {
      res.status(404).send("Plato no encontrado");
    }
  } catch (err) {
    res.status(500).send("Error al obtener el plato");
  }
};

// Actualizar un plato
const updateDish = async (req, res) => {
  try {
    const { menuId, id } = req.params;
    const { name, description, price } = req.body;
    const updatedDish = await dishesModel.updateDish(menuId, id, name, description, price);
    if (updatedDish) {
      res.json(updatedDish);
    } else {
      res.status(404).send("Plato no encontrado");
    }
  } catch (err) {
    res.status(500).send("Error al actualizar el plato");
  }
};

// Eliminar un plato
const deleteDish = async (req, res) => {
  try {
    const { menuId, id } = req.params;
    const deletedDish = await dishesModel.deleteDish(menuId, id);
    if (deletedDish) {
      res.json({ message: "Plato eliminado correctamente", deletedDish });
    } else {
      res.status(404).send("Plato no encontrado");
    }
  } catch (err) {
    res.status(500).send("Error al eliminar el plato");
  }
};

export const dishController = {
  getDishesByMenuId,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
};
