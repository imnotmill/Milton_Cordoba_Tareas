import Libros from '../models/libros.model.js';

const ControladorLibros = {
  obtenerTodosLosLibros: async (req, res) => {
    try {
      const allBooks = await Libros.find();
      return res.status(200).json(allBooks);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  crearLibro: async (req, res) => {
    try {
      const { titulo, autor } = req.body;
      if (!titulo || !autor) {
        return res.status(400).json({ error: 'Título y autor son obligatorios' });
      }
      const nuevoLibro = { titulo, autor };
      const bookCreated = await Libros.create(nuevoLibro);
      return res.status(201).json(bookCreated);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  encontrarLibro: async (req, res) => {
    const autor = req.params.autor;
    
    try {
      const librosDelAutor = await Libros.find({ autor: autor });
      if (!librosDelAutor || librosDelAutor.length === 0) {
        return res.status(404).json({ error: 'No se encontraron libros de este autor' });
      }
      return res.status(200).json(librosDelAutor);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

export default ControladorLibros;