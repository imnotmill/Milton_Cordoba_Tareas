import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/databaseConnect.js';
import routerSongs from './routes/songs.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT2 || 8080;

console.log('BD:', process.env.BD);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use('/api', routerSongs);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});