import { Router } from 'express';
import ControladorLibros from '../controllers/books.controller.js';

const router = Router();

router.route('/libros')
  .get(ControladorLibros.obtenerTodosLosLibros)
  .post(ControladorLibros.crearLibro);

export default router;