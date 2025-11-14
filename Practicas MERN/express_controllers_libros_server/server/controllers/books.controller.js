let libros = [
  { id: 1, titulo: "El último deseo", autor: "Andrzej Sapkowski" },
  { id: 2, titulo: "La espada del destino", autor: "Andrzej Sapkowski" },
  { id: 3, titulo: "La sangre de los elfos", autor: "Andrzej Sapkowski" },
  { id: 4, titulo: "Tiempo de odio", autor: "Andrzej Sapkowski" },
  { id: 5, titulo: "Bautismo de fuego", autor: "Andrzej Sapkowski" },
  { id: 6, titulo: "La torre de la golondrina", autor: "Andrzej Sapkowski" },
  { id: 7, titulo: "La dama del lago", autor: "Andrzej Sapkowski" },
  { id: 8, titulo: "La estación de la tormenta", autor: "Andrzej Sapkowski" }
];

const ControladorLibros = {
  obtenerTodosLosLibros: (req, res) => {
    res.json(libros);
  },
  crearLibro: (req, res) => {
    const nuevoLibro = req.body;
    libros.push(nuevoLibro);
    res.json(nuevoLibro);
  }
};

export default ControladorLibros;