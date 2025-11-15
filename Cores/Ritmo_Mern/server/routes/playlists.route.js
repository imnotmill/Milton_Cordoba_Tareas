import {Router} from 'express'
import playlistController from '../controllers/playlists.controller.js'


const playlistRoutes = Router();


playlistRoutes.get('/', playlistController.getAll);
playlistRoutes.get('/:id', playlistController.getOne);
playlistRoutes.post('/', playlistController.createOne);
playlistRoutes.put('/:id', playlistController.updateOne);
playlistRoutes.delete('/:id', playlistController.deleteOne);

export default playlistRoutes;