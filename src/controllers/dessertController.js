import { dessertModel } from "../models/dessertModels.js";

// Obtener todos los postres de un menú específico
const getDessertsByMenuId = async (req, res) => {
  try {
    const desserts = await dessertModel.findDessertsByMenuId(req.params.menuId);
    res.json(desserts);
  } catch (err) {
    res.status(500).send("Error al obtener los postres");
  }
};

// Obtener un postre por ID
const getDessertById = async (req, res) => {
  const { menuId, id } = req.params;
  try {
    const dessert = await dessertModel.findDessertById(menuId, id);
    if (dessert) {
      res.json(dessert);
    } else {
      res.status(404).send("Postre no encontrado");
    }
  } catch (err) {
    res.status(500).send("Error al obtener el postre");
  }
};

// Crear un nuevo postre
const createDessert = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newDessert = await dessertModel.createDessert(req.params.menuId, name, description, price);
    res.status(201).json(newDessert);
  } catch (err) {
    res.status(500).send("Error al crear el postre");
  }
};

// Actualizar un postre
const updateDessert = async (req, res) => {
  const { name, description, price } = req.body;
  const { menuId, id } = req.params;
  try {
    const updatedDessert = await dessertModel.updateDessert(menuId, id, name, description, price);
    if (updatedDessert) {
      res.json(updatedDessert);
    } else {
      res.status(404).send("Postre no encontrado");
    }
  } catch (err) {
    res.status(500).send("Error al actualizar el postre");
  }
};

// Eliminar un postre
const deleteDessert = async (req, res) => {
  const { menuId, id } = req.params;
  try {
    const deletedDessert = await dessertModel.deleteDessert(menuId, id);
    if (deletedDessert) {
      res.json({ message: "Postre eliminado correctamente" });
    } else {
      res.status(404).send("Postre no encontrado");
    }
  } catch (err) {
    res.status(500).send("Error al eliminar el postre");
  }
};

export const dessertController = {
  getDessertsByMenuId,
  getDessertById,
  createDessert,
  updateDessert,
  deleteDessert,
};
