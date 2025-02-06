import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { restaurantModel } from "../models/restuarantModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! Encuentra todos los restaurantes
const findRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findAllRestaurant()
        res.json(restaurant);
    } catch (error) {
        res.status(500).send('Error al obtener el restaurante')
    }
}

//! Obtener restaurantes por user_id
const findRestaurantsByUserId = async (req, res) => {
    const { user_id } = req.params; // Obtener el user_id desde los parámetros
    if (!user_id) {
        return res.status(400).send('No se ha encontrado el user_id. El usuario debe estar autenticado.');
    }
    try {
        const restaurantes = await restaurantModel.findRestaurantByid(user_id);
        if (restaurantes.length > 0) {
            res.json(restaurantes);
        } else {
            res.status(404).send('No se encontraron restaurantes para este usuario');
        }
    } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
        res.status(500).send('Error al obtener los restaurantes');
    }
};


const createRestaurante = async (req, res) => {
    const { name, ubicacion, objetivos, descripcion, user_id } = req.body; // Aquí se recibe el user_id
    let logo = null;

    if (req.files && req.files.logo) {
        const imageFile = req.files.logo;
        const uploadDir = path.join(__dirname, '../public/img/usuario');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const sanitizedFileName = imageFile.name.replace(/\s+/g, '_').toLowerCase();
        const filePath = path.join(uploadDir, sanitizedFileName);
        logo = sanitizedFileName;
        try {
            await imageFile.mv(filePath);
        } catch (err) {
            console.log(err);
            return res.status(500).send('Error al guardar la imagen');
        }
    }
    
    try {
        const newRestaurant = await restaurantModel.createRestaurante(name, ubicacion, objetivos, logo, descripcion, user_id); // Asegúrate de que el modelo soporte este campo
        res.status(201).json({
            name,
            ubicacion,
            objetivos,
            logo: `http://localhost:${3000}/img/usuario/${logo}`,
            descripcion,
            user_id // Aquí también podrías devolver el user_id en la respuesta
        });
        console.log(newRestaurant)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el restaurante');
    }
};


//! Actualizar el restaurante por id
const updateRestaurante = async (req, res) => {
    const { id } = req.params;
    const { name, ubicacion, objetivos, descripcion } = req.body;
    let logo = req.body.logo;

    if (!id || !name || !ubicacion || !objetivos || !descripcion) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Recuperar la imagen actual si no se sube una nueva
    if (!req.files || !req.files.logo) {
        const restauranteExistente = await restaurantModel.findRestaurantByid(id);
        if (!restauranteExistente) {
            return res.status(404).json({ error: 'Restaurante no encontrado' });
        }
        logo = restauranteExistente.logo; // Mantener la imagen actual
    } else {
        // Si se sube una imagen, guardarla
        const imageFile = req.files.logo;
        const uploadDir = path.join(__dirname, '../public/img/usuario');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const sanitizedFileName = imageFile.name.replace(/\s+/g, '_').toLowerCase();
        const filePath = path.join(uploadDir, sanitizedFileName);
        logo = sanitizedFileName;

        try {
            await imageFile.mv(filePath);
        } catch (err) {
            console.error('Error al guardar la imagen:', err);
            return res.status(500).json({ error: 'Error al guardar la imagen' });
        }
    }

    try {
        const updatedRestaurante = await restaurantModel.updateRestaurante(id, name, ubicacion, objetivos, logo, descripcion);
        if (updatedRestaurante) {
            res.json(updatedRestaurante);
        } else {
            res.status(404).json({ error: 'Restaurante no encontrado' });
        }
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error al actualizar el restaurante' });
    }
};


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
    findRestaurantsByUserId,
    createRestaurante,
    updateRestaurante,
    deleteRestaurante
}