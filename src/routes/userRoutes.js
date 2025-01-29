//* Ruta de prueba
import { Router } from 'express'
import { createUser, deleteUser, getUser, getUserByID, updateUser } from '../controllers/userController.js'

const router = Router()

router.get('/user', getUser)
router.get('/user/:id', getUserByID)
router.post('/user', createUser)
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateUser)
export default router;