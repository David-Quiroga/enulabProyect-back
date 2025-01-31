import { foodTypeModel } from '../models/food_typeModels.js';

// Obtener todos los tipos de comida de un restaurante
const getFoodTypesByRestId = async (req, res) => {
    try {
        const foodTypes = await foodTypeModel.findFoodTypesByRestId(req.params.menuId);
        res.json(foodTypes);
    } catch (error) {
        console.error("Error en getFoodTypesByRestId:", error);
        res.status(500).json({ error: 'Error al obtener los tipos de comida', detalle: error.message });
    }
};

// Obtener un tipo de comida por ID
const getFoodTypeById = async (req, res) => {
    const { menuId, id } = req.params;
    try {
        const foodType = await foodTypeModel.findFoodTypeById(menuId, id);
        if (foodType) {
            res.json(foodType);
        } else {
            res.status(404).json({ error: 'Tipo de comida no encontrado' });
        }
    } catch (error) {
        console.error("Error en getFoodTypeById:", error);
        res.status(500).json({ error: 'Error al obtener el tipo de comida', detalle: error.message });
    }
};

// Crear un tipo de comida
const createFoodType = async (req, res) => {
    const { name_type, state, descripcion } = req.body;
    try {
        const newFoodType = await foodTypeModel.createFoodType(req.params.menuId, name_type, state, descripcion);
        res.status(201).json(newFoodType);
    } catch (error) {
        console.error("Error en createFoodType:", error);
        res.status(500).json({ error: 'Error al crear el tipo de comida', detalle: error.message });
    }
};

// Actualizar un tipo de comida por ID
const updateFoodType = async (req, res) => {
    const { menuId, id } = req.params;
    const { name_type, state, descripcion } = req.body;

    try {
        const updatedFoodType = await foodTypeModel.updateFoodType(menuId, id, name_type, state, descripcion);
        
        if (updatedFoodType) {
            res.json(updatedFoodType);
        } else {
            res.status(404).json({ error: 'Tipo de comida no encontrado' });
        }
    } catch (error) {
        console.error("Error en updateFoodType:", error);
        res.status(500).json({ error: 'Error al actualizar el tipo de comida', detalle: error.message });
    }
};

// Eliminar un tipo de comida por ID
const deleteFoodType = async (req, res) => {
    const { menuId, id } = req.params;

    try {
        const deletedFoodType = await foodTypeModel.deleteFoodType(menuId, id);
        if (!deletedFoodType) {
            return res.status(404).json({ error: 'Tipo de comida no encontrado' });
        }
        res.json({ message: 'Tipo de comida eliminado', deletedFoodType });
    } catch (error) {
        console.error("Error en deleteFoodType:", error);
        res.status(500).json({ error: 'Error al eliminar el tipo de comida', detalle: error.message });
    }
};

export const foodTypeController = {
    getFoodTypesByRestId,
    getFoodTypeById,
    createFoodType,
    updateFoodType,
    deleteFoodType
};
