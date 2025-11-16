import { Router } from "express";
import peliculasController from "../controllers/peliculas.controller.js";
import validateToken from "../middleware/validateToken.js";

const peliculasRoutes = Router();

peliculasRoutes.get("/", validateToken, peliculasController.getAll);
peliculasRoutes.post("/", validateToken, peliculasController.createOne);
peliculasRoutes.delete("/:id", validateToken, peliculasController.deleteOne);
peliculasRoutes.get("/:id", validateToken, peliculasController.getOne);
peliculasRoutes.put("/:id", validateToken, peliculasController.updateOne);

export default peliculasRoutes;
