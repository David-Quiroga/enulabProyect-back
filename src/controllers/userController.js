import { userModel } from '../models/userModel.js'

const createUser = async (req, res) => {
    const { nombreCompleto, correoElectronico, password, ruc, contacto } = req.body;
    try {
        const newUser = await userModel.createUser(nombreCompleto, correoElectronico, password, ruc, contacto)
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error al crear el usuario');
    }
}
export const userController = {
    createUser
}