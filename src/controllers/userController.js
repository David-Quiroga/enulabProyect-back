import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'tu_clave_secreta';

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { nombreCompleto, correoElectronico, password, ruc, contacto } = req.body;

    if (!nombreCompleto || !correoElectronico || !password || !ruc || !contacto) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const newUser = await userModel.createUser(nombreCompleto, correoElectronico, password, ruc, contacto);
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: newUser,
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    const { correoElectronico, password } = req.body;

    if (!correoElectronico || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos.' });
    }

    try {
        const user = await userModel.findUserByEmail(correoElectronico);
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Crear un token JWT
        const token = jwt.sign({ id: user.id, correoElectronico: user.correoElectronico }, secret, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
};

// Validar si el correo existe
const validateEmail = async (req, res) => {
    const { correoElectronico } = req.body;

    if (!correoElectronico) {
        return res.status(400).json({ message: 'El correo electrónico es requerido.' });
    }

    try {
        const user = await userModel.findUserByEmail(correoElectronico);
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
