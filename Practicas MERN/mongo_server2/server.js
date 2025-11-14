import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './server/config/databaseConnect.js';
import routerLibros from './server/routes/books.routes.js';

// Cargar variables de entorno desde la raíz
dotenv.config();

const app = express();
const PORT = process.env.PORT2 || 8080;

console.log('BD:', process.env.BD);

app.use(cors());
app.use(express.json());
app.use('/api', routerLibros);

connectToDb();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});