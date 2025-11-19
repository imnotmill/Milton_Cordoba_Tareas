import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import toConnectToBd from './config/database.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cancionRoutes from './routes/cancionRoutes.js';
import albumRoutes from './routes/albumRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT2 || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

// Conexión a la base de datos
toConnectToBd();

// Rutas públicas (sin autenticación)
app.use('/api/usuarios', usuarioRoutes);

// Rutas protegidas (con autenticación JWT)
app.use('/api/canciones', cancionRoutes);
app.use('/api/albumes', albumRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});