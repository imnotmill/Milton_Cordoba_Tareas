import express from "express";
import { getCancion, getPlaylist } from "./controllers/music.Controller.js";


const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Rutas usando controllers
app.route("/api/cancion").get(getCancion);
app.route("/api/playlist").get(getPlaylist);


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));