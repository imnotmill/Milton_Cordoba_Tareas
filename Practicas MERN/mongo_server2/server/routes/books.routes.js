import { Router } from 'express';
import ControladorLibros from '../controllers/books.controller.js';

const router = Router();

router.route('/libros')
  .get(ControladorLibros.obtenerTodosLosLibros)
  .post(ControladorLibros.crearLibro);

router.route('/libros/:autor')
  .get(ControladorLibros.encontrarLibro);

export default router;