import { inventoryModel } from '../models/inventoryModel.js'

//Obtener el inventario de un restaurante
const getInventoryByRestId = async(req, res) => {
    try {
        const inventory = await inventoryModel.findInventoryByRestId(req.params.restaurantId) 
        res.json(inventory);
    } catch (error) {
        res.status(500).send('Error al obtener el inventario')
    }
}

//Obtener un inventario por ID
const getInventoryById = async (req, res) => {
    const { restaurantId, id } = req.params
    try {
        const inventory = await inventoryModel.findInventoryById(restaurantId, id)
        if (inventory) {
            res.json(inventory)
        } else {
            res.status(404).send('Inventario no encontrado')
        }
    } catch (error) {
        res.status(500).send('Error al obtener el inventario')
    }
}

// Crear un inventario
const createInventory = async (req, res) => {
    const { nombreproductos, cantidad, categoria, descripcion } = req.body;
    const { restaurantId } = req.params; 

    if (!restaurantId || !nombreproductos || !cantidad || !categoria || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        const newInventory = await inventoryModel.createInventory(
            restaurantId,
            nombreproductos,
            cantidad,
            categoria,
            descripcion
        );
        res.status(201).json(newInventory);
    } catch (error) {
        console.error("Error al crear el inventario:", error);
        res.status(500).json({ error: "Error al crear el inventario" });
    }
};

// Actualizar el inventario por ID
const updateInventory = async (req, res) => {
    const { restaurantId, id } = req.params;
    const { nombreproductos, cantidad, categoria, descripcion } = req.body;

    // Validar que los parámetros sean correctos
    if (!restaurantId || !id) {
        return res.status(400).json({ error: "El restaurantId y el id del inventario son requeridos" });
    }

    try {
        const updatedInventory = await inventoryModel.updateInventory(
            restaurantId,
            id,
            nombreproductos,
            cantidad,
            categoria,
            descripcion
        );

        if (updatedInventory) {
            res.json(updatedInventory);
        } else {
            res.status(404).json({ error: "Inventario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el inventario:", error);
        res.status(500).json({ error: "Error al actualizar el inventario" });
    }
};


//Eliminar restaurante por id
const deleteInventory = async (req, res) => {
    const { restaurantId, id } = req.params
    try {
        const deleteInventory = await inventoryModel.deleteInventory(restaurantId, id)
        if (deleteInventory) {
            res.json({message: 'Inventario eliminado', deleteInventory})
        } else {
            res.status(404).send('Error al eliminar el inventario')
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el inventario')
    }
}

export const inventoryController = {
    getInventoryByRestId,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
}