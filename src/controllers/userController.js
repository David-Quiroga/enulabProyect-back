import { userModel } from '../models/userModel.js';

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { nombreCompleto, correoelectronico, password, ruc, contacto } = req.body;

    if (!nombreCompleto || !correoelectronico || !password || !ruc || !contacto) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const newUser = await userModel.createUser(nombreCompleto, correoelectronico, password, ruc, contacto);
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: newUser,
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Iniciar sesión sin hash
const login = async (req, res) => {
    const { correoelectronico, password } = req.body;

    if (!correoelectronico || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos.' });
    }

    try {
        const user = await userModel.findUserByEmail(correoelectronico);
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
};

// Validar si el correo existe
const validateEmail = async (req, res) => {
    const { correoelectronico } = req.body;

    if (!correoelectronico) {
        return res.status(400).json({ message: 'El correo electrónico es requerido.' });
    }

    try {
        const user = await userModel.findUserByEmail(correoelectronico);
        if (user) {
            return res.status(200).json({ message: 'El correo existe en la base de datos.' });
        } else {
            return res.status(404).json({ message: 'El correo no está registrado.' });
        }
    } catch (error) {
        console.error('Error al validar el correo:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud.' });
    }
};

export const userController = {
    createUser,
    login,
    validateEmail,
};
