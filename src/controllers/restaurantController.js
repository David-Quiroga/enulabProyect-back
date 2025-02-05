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
    const { name, ubicacion, objetivos, descripcion } = req.body;
    let logo = null;

    if (req.files && req.files.logo) {
        const imageFile = req.files.logo; // Corrección de la variable
        const uploadDir = path.join(__dirname, '../public/img/usuario');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const sanitizedFileName = imageFile.name.replace(/\s+/g, '_').toLowerCase();
        const filePath = path.join(uploadDir, sanitizedFileName);
        logo = sanitizedFileName;
        try {
            await imageFile.mv(filePath); // Mover la imagen al servidor
            console.log(filePath)
        } catch (err) {
            console.log(err);
            return res.status(500).send('Error al guardar la imagen');
        }
    }
    try {
        const newRestaurant = await restaurantModel.createRestaurante(name, ubicacion, objetivos, logo, descripcion);
        res.status(201).json({
            name,
            ubicacion,
            objetivos,
            logo: `http://localhost:${3000}/img/usuario/${logo}`,
            descripcion
        });
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
    findRestaurantByid,
    createRestaurante,
    updateRestaurante,
    deleteRestaurante
}

/* 
//! Encuentra todos los restaurantes del usuario autenticado
const findRestaurant = async (req, res) => {
    const userId = req.user.id;  // Suponiendo que tienes autenticación
    try {
        const restaurants = await restaurantModel.findAllRestaurant(userId);
        res.json(restaurants);
    } catch (error) {
        res.status(500).send('Error al obtener los restaurantes');
    }
}

//! Obtener un restaurante específico verificando que pertenece al usuario
const findRestaurantByid = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;  
    try {
        const restaurant = await restaurantModel.findRestaurantByid(id, userId);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).send('Restaurante no encontrado o no autorizado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el restaurante');
    }
};

//! Crear un nuevo restaurante
const createRestaurante = async (req, res) => {
    const { name, ubicacion, objetivos, logo, descripcion } = req.body;
    const userId = req.user.id;  // Obtener el userId desde la autenticación
    try {
        const newRestaurant = await restaurantModel.createRestaurante(name, ubicacion, objetivos, logo, descripcion, userId);
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error al crear el restaurante');
    }
}

//! Actualizar un restaurante solo si pertenece al usuario autenticado
const updateRestaurante = async (req, res) => {
    const { id } = req.params;
    const { name, ubicacion, objetivos, logo, descripcion } = req.body;
    const userId = req.user.id;
    try {
        const updatedRestaurant = await restaurantModel.updateRestaurante(id, name, ubicacion, objetivos, logo, descripcion, userId);
        if (updatedRestaurant) {
            res.json(updatedRestaurant);
        } else {
            res.status(404).send('Restaurante no encontrado o no autorizado');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el restaurante');
    }
}

//! Eliminar un restaurante solo si pertenece al usuario autenticado
const deleteRestaurante = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const deletedRestaurant = await restaurantModel.deleteRestaurante(id, userId);
        if (deletedRestaurant) {
            res.json({ message: 'Restaurante eliminado', deletedRestaurant });
        } else {
            res.status(404).send('Restaurante no encontrado o no autorizado');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el restaurante');
    }
}

*/