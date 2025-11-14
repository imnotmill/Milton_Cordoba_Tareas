import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/databaseConnect.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT2 || 8080;

app.use(express.json());

connectToDb();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});