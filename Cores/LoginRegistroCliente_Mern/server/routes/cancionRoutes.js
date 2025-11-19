import express from 'express';
import autenticarJWT from '../middleware/jwt.config.js';

const router = express.Router();

// Todas las rutas de canciones requieren autenticación
router.use(autenticarJWT);

// Obtener todas las canciones
router.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Lista de canciones',
    usuario: req.usuario // Información del usuario autenticado
  });
});

// Obtener una canción por ID
router.get('/:id', (req, res) => {
  res.json({ 
    mensaje: `Detalles de la canción ${req.params.id}`,
    usuario: req.usuario
  });
});

// Crear una nueva canción
router.post('/', (req, res) => {
  res.json({ 
    mensaje: 'Canción creada exitosamente',
    datos: req.body,
    usuario: req.usuario
  });
});

// Actualizar una canción
router.put('/:id', (req, res) => {
  res.json({ 
    mensaje: `Canción ${req.params.id} actualizada`,
    datos: req.body,
    usuario: req.usuario
  });
});

// Eliminar una canción
router.delete('/:id', (req, res) => {
  res.json({ 
    mensaje: `Canción ${req.params.id} eliminada`,
    usuario: req.usuario
  });
});

export default router;
