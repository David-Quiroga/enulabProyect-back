import { commentModel } from '../models/commentsModel.js'

//Obtener todos los comentarios de un restaurante
const getCommentByRestId = async (req, res) => {
    try {
        const comment = await commentModel.findCommentsByRestId(req.params.restaurantId)
        res.json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al obtener el comentario')
    }
}

const getCommentById = async (req, res) => {
    const { restaurantId, id } = req.params
    try {
        const comment = await commentModel.findCommentsById(restaurantId, id)
        console.log(comment)  // Verifica qué datos estás obteniendo
        if (comment) {
            res.json(comment)
        } else {
            res.status(404).send('Comentario no encontrado')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error del servidor')
    }
}


const createComment = async (req, res) => {
    const {rating, date, content} = req.body
    try {
        const newComment = await commentModel.createComment(req.params.restaurantId, rating, date, content)
        res.status(201).json(newComment)
    } catch (error) {
        console.log(error)
        res.status(500).send({error: 'Error del servidor'})
    }
}

export const commentsController = {
    getCommentByRestId,
    getCommentById,
    createComment
}