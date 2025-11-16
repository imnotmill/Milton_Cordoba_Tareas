import {Router} from "express"
import forosController from "../controllers/foros.controller.js"
import validateToken from "../middleware/validateToken.js";

const forosRoutes = Router();

forosRoutes.get('/', validateToken , forosController.getAll )
forosRoutes.post('/new', forosController.createOne)
forosRoutes.get('/:id', validateToken, forosController.getOne)
forosRoutes.delete('/:id', validateToken, forosController.deleteOne)
forosRoutes.put('/update/:id',validateToken,  forosController.updateOne)

export default forosRoutes;