import express from 'express'
import { commentsController } from '../controllers/commentsController.js'

const router = express.Router()

router.get('/restaurante/:restaurantId/comments', commentsController.getCommentByRestId)
//router.get('/restaurante/:restauranteId/comments/:id', commentsController.getCommentById)
router.get('/restaurante/:restaurantId/comments/:id', commentsController.getCommentById)
router.post('/restaurante/:restaurantId/comments', commentsController.createComment)

export default router