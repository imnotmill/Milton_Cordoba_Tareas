import { Router } from 'express';
import songsController from '../controllers/songs.controller.js';

const routerSongs = Router();

routerSongs.post('/canciones', songsController.crearCancion);
routerSongs.get('/canciones', songsController.obtenerCanciones);
routerSongs.get('/canciones/:id', songsController.obtenerCancionPorId);
routerSongs.put('/canciones/:id', songsController.actualizarCancion);
routerSongs.delete('/canciones/:id', songsController.eliminarCancion);

export default routerSongs;