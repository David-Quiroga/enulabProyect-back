import { restaurantModel } from "../models/restuarantModel.js";

//! Encuentra todos los restaurantes
const findRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findAllRestaurant()
        res.json(restaurant);
    } catch (error) {
        res.status(500).send('Error al obtener el restaurante')
    }
}

//!Obtener un restautan especifico por id
const findRestaurantByid = async (req, res) => {
    try {
        const restaurante = await restaurantModel.findRestaurantByid(req.params.id)
        if (restaurante){
            res.json(restaurante)
        } else {
            res.status(404).send('Restaurante no encontrado')
        }
    } catch (error) {
        res.status(500).send('Error al obtener el restaurante')
    }
};

//! Crear un nuevo restaurante
const createRestaurante = async (req, res) => {
    const { name, ubicacion, objetivos, logo, descripcion } = req.body;
    try {
        const newRestaurant = await restaurantModel.createRestaurante(name, ubicacion, objetivos, logo, descripcion)
        res.status(201).json(newRestaurant)
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error al crear el restaurante');
    }
}

//! Actualizar el restaurante por id
const updateRestaurante = async(req, res) => {
    const { id } = req.params;
    const { name, ubicacion, objetivos, logo, descripcion } = req.body
    try {
        const updateRestaurante = await restaurantModel.updateRestaurante(id, name, ubicacion, objetivos, logo, descripcion)
        if (updateRestaurante) {
            res.json(updateRestaurante)
        } else {
            res.status(404).send('Restaurante no encontrado')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al actualizar el restaurante')
    }
}

//! Eliminar un menu por id
const deleteRestaurante  = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRestaurante = await restaurantModel.deleteRestaurante(id)
        if (deleteRestaurante) {
            res.json({messagge: 'Restaurante eliminado', deleteRestaurante})
        } else {
            res.status(404).send('Restaurante no encontrado')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al eliminar el restaurante')
    }
}

export const restaurantController = {
    findRestaurant,
    findRestaurantByid,
    createRestaurante,
    updateRestaurante,
    deleteRestaurante
}