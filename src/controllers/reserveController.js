import { reserveModel } from '../models/reserveModel.js'

//Obtener todos los empleado de un restaurante
const getReserveByRestId = async (req, res) => {
    try {
        const reserve = await reserveModel.findReserveByRestId(req.params.restaurantId)
        res.json(reserve)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al obtener la reserva')
    }
}

const getReserveById = async(req, res) => {
    const { restaurantId, id } = req.params
    try {
        const reserve = await reserveModel.findReserveById(restaurantId, id)
        if (reserve) {
            res.json(reserve)
        } else {
            res.status(404).send('Reserva no encontrada')
        }
    } catch (error) {
        res.status(500).send('Error al obtener la reserva')
    }
}

const createReserve = async (req, res) => {
    const { name, date, people, comments } = req.body
    try {
        const newReserve = await reserveModel.createReserve(req.params.restaurantId, name, date, people, comments)
        res.status(201).json(newReserve)
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Error al crear la reserva'})
    }
}


export const reserveController = {
    getReserveByRestId,
    getReserveById,
    createReserve
}