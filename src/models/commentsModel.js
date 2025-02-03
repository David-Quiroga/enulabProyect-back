import { pool } from '../db.js'

//Obtener todos los comentarios del restaurante
const findCommentsByRestId = async (restaurantId) => {
    const { rows } = await pool.query('SELECT * FROM comment WHERE restaurant_id = $1', [restaurantId])
    return rows
}

//Obtener todos los comentarios por id
const findCommentsById = async (restaurantId, commentId) => {
    const { rows } = await pool.query('SELECT * FROM comment WHERE restaurant_id = $1 AND id = $2', [restaurantId, commentId])
    return rows.length > 0 ? rows[0] : null
}


//Crear un nuevo comentario en un restaurante
const createComment = async (restaurantId, rating, date, content) => {
    const query = 'INSERT INTO comment (restaurant_id, rating, date, content) VALUES($1, $2, $3, $4) RETURNING *'
    const { rows } = await pool.query(query, [restaurantId, rating, date, content])
    return rows[0]
}

export const commentModel = {
    findCommentsByRestId,
    findCommentsById,
    createComment
}