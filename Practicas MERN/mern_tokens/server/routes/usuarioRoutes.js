import express from 'express';
import { registrar } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/registro', registrar);
axios.post('/api/login', payload, { withCredentials: true });
axios.get('/api/protected', { withCredentials: true });

export default router;