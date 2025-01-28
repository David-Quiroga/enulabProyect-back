//! son de prueba
import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

router.get('/user', async (req, res) => {

    const {rows} = await pool.query('SELECT * FROM users WHERE id = 1')
    res.json(rows);    
})

router.get('/user/:id', (req, res) => {
    const { id } = req.params
    res.send('Holap', + id)
})

router.post('/user', (req, res) => {
    res.send('Crea un usuario')
})

router.delete('/user/:id', (req, res) => {
    res.send('Holap')
})

router.put('/user/:id', (req, res) => {
    res.send('Holap')
})
export default router;