import express from 'express';
import autenticarJWT from '../middleware/jwt.config.js';

const router = express.Router();

// Todas las rutas de álbumes requieren autenticación
router.use(autenticarJWT);

// Obtener todos los álbumes
router.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Lista de álbumes',
    usuario: req.usuario
  });
});

// Obtener un álbum por ID
router.get('/:id', (req, res) => {
  res.json({ 
    mensaje: `Detalles del álbum ${req.params.id}`,
    usuario: req.usuario
  });
});

// Crear un nuevo álbum
router.post('/', (req, res) => {
  res.json({ 
    mensaje: 'Álbum creado exitosamente',
    datos: req.body,
    usuario: req.usuario
  });
});

// Actualizar un álbum
router.put('/:id', (req, res) => {
  res.json({ 
    mensaje: `Álbum ${req.params.id} actualizado`,
    datos: req.body,
    usuario: req.usuario
  });
});

// Eliminar un álbum
router.delete('/:id', (req, res) => {
  res.json({ 
    mensaje: `Álbum ${req.params.id} eliminado`,
    usuario: req.usuario
  });
});

export default router;
