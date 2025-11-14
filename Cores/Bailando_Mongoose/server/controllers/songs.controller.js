import Cancion from '../models/songs.model.js';
import mongoose from 'mongoose';

const songsController = {
  crearCancion: async (req, res) => {
    try {
      const { titulo, artista, lanzamiento, genero } = req.body;

      if (!titulo || !artista || lanzamiento === undefined || !genero) {
        return res.status(400).json({ error: 'Los campos titulo, artista, lanzamiento y genero son obligatorios' });
      }

      const anio = Number(lanzamiento);
      if (Number.isNaN(anio)) {
        return res.status(400).json({ error: 'lanzamiento debe ser un número' });
      }

      const nueva = { titulo, artista, lanzamiento: anio, genero };
      const creada = await Cancion.create(nueva);
      return res.status(201).json(creada);
    } catch (e) {
      if (e.name === 'ValidationError') {
        return res.status(400).json({ error: e.message });
      }
      return res.status(500).json({ error: e.message });
    }
  },

  obtenerCanciones: async (req, res) => {
    try {
      const canciones = await Cancion.find();
      return res.status(200).json(canciones);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  obtenerCancionPorId: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      const cancion = await Cancion.findById(id);
      if (!cancion) return res.status(404).json({ error: 'Canción no encontrada' });
      return res.status(200).json(cancion);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  actualizarCancion: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      const { titulo, artista, lanzamiento, genero } = req.body;
      const update = {};
      if (titulo !== undefined) update.titulo = titulo;
      if (artista !== undefined) update.artista = artista;
      if (lanzamiento !== undefined) update.lanzamiento = Number(lanzamiento);
      if (genero !== undefined) update.genero = genero;

      const actualizado = await Cancion.findByIdAndUpdate(id, update, { new: true, runValidators: true });
      if (!actualizado) return res.status(404).json({ error: 'Canción no encontrada' });
      return res.status(200).json(actualizado);
    } catch (e) {
      if (e.name === 'ValidationError') {
        return res.status(400).json({ error: e.message });
      }
      return res.status(500).json({ error: e.message });
    }
  },

  eliminarCancion: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      const eliminado = await Cancion.findByIdAndDelete(id);
      if (!eliminado) return res.status(404).json({ error: 'Canción no encontrada' });
      return res.status(200).json({ message: 'Canción eliminada correctamente' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

export default songsController;