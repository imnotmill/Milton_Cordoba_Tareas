//importacion
import express from 'express';


//initialize de la app
const app = express();

const PORT = 8080;

const personas = [
    {nombre: 'Juan', edad: 30},
    {nombre: 'Ana', edad: 25},
    {nombre: 'Luis', edad: 28}
]


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//manejo de rutas complejas
app.route('/personas2').get((req, res) => {
    res.send ("te conectaste via get")}).post((req, res) => {
        res.send("te conectaste via post")
    })


//rutas
app.use(express.static('public'));

app.get('/personas', (req, res) => {
   res.statusMessage = "jaja";
   res.status(201).json(personas);
})

app.post('/personas', (req, res) => {
    console.log(req.body)
    const {nombre, edad} = req.body;
    if (!nombre || !edad) {
        return res.status(405).json({Message: "Faltan datos"})
    }
    const newPersona = {nombre, edad};
    personas.push(newPersona);
    res.status(201).json(newPersona)
})

app.get('/personas/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const persona = personas.find(per => per.nombre === nombre)
    if (!persona) {
        return res.status(404).json({Message: "Persona no encontrado"})
    }
    res.status(201).json(persona)
})

//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})