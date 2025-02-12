import { dishesModel } from "../models/dishesModels.js";

// Obtener todos los platos de un menú específico
const getAllDishes = async (req, res) => {
  try {
    const dishes = await dishesModel.findAllDishes(req.params.menuId);
    res.json(dishes);
  } catch (err) {
    console.error('Error al obtener los platos:', err);
    res.status(500).json({ error: 'Error al obtener los platos' });
  }
};

// Obtener un plato específico por ID
const getDishById = async (req, res) => {
  const { menuId, id } = req.params;  // Cambio aquí
  try {
    const dish = await dishesModel.findDishById(menuId, id);  // Cambio aquí
    if (dish) {
      res.json(dish);
    } else {
      res.status(404).json({ error: 'Plato no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener el plato:', err);
    res.status(500).json({ error: 'Error al obtener el plato' });
  }
};

// Crear un nuevo plato
const createDish = async (req, res) => {
  const { name, description, price } = req.body;
  const { menuId } = req.params;

  if (!menuId || !name || !description || !price) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const newDish = await dishesModel.createDish(menuId, name, description, price);
    res.status(201).json(newDish);
  } catch (err) {
    console.error('Error al crear el plato:', err);
    res.status(500).json({ error: 'Error al crear el plato' });
  }
};

// Actualizar un plato por ID
const updateDish = async (req, res) => {
  const { menuId, id } = req.params;  // Cambio aquí
  const { name, description, price } = req.body;

  if (!menuId || !id) {
    return res.status(400).json({ error: 'El menuId y el id del plato son requeridos' });
  }

  try {
    const updatedDish = await dishesModel.updateDish(menuId, id, name, description, price);  // Cambio aquí
    if (updatedDish) {
      res.json(updatedDish);
    } else {
      res.status(404).json({ error: 'Plato no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar el plato:', err);
    res.status(500).json({ error: 'Error al actualizar el plato' });
  }
};

// Eliminar un plato por ID
const deleteDish = async (req, res) => {
  const { menuId, id } = req.params;  // Cambio aquí

  try {
    const deletedDish = await dishesModel.deleteDish(menuId, id);  // Cambio aquí
    if (deletedDish) {
      res.json({ message: 'Plato eliminado exitosamente', deletedDish });
    } else {
      res.status(404).json({ error: 'Plato no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el plato:', err);
    res.status(500).json({ error: 'Error al eliminar el plato' });
  }
};

export const dishesController = {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
};
