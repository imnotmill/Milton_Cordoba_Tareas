import express from 'express';
import routerLibros from './routes/books.routes.js';

const app = express();
const puerto = 8000;

// Middleware de análisis de JSON
app.use(express.json());

// Registro del enrutador
app.use('/api', routerLibros);

app.listen(puerto, () => {
  console.log(`Servidor activo en http://localhost:${puerto}`);
});