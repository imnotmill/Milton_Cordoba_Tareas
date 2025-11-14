import express from 'express';
import routerLibros from './routes/books.routes.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', routerLibros);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
