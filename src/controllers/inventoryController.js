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

//Crear un inventario
const createInventory = async (req, res) => {
    const { nombreProductos, estado, cantidad, categoria, descripcion } = req.body
    try {
        const newInventory = await inventoryModel.createInventory(req.params.restaurantId, nombreProductos, estado, cantidad, categoria, descripcion)
        res.status(201).json(newInventory)
    } catch (error) {
        console.log('Error al crear',error)
        res.status(500).send({error: 'Error al crear el inventario'})
    }
}

//Actualizar el inventario por id
const updateInventory = async (req, res) => {
    const { restaurantId, id } = req.params
    const { nombreProductos, estado, cantidad, categoria, descripcion } = req.body
    try {
        const updateInventory = await inventoryModel.updateInventory(restaurantId, id, nombreProductos, estado, cantidad, categoria, descripcion)
        if (updateInventory) {
            res.json(updateInventory)
        } else {
            res.status(404).send('Inventario no encontrado')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al actualizar el inventario')
    }
}

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