const express = require('express');

//initialize de la app
const app = express();

//definicion de puerto
const PORT = 8080;

//middleware

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/persona', (req, res) => {
    res.send({nombre: 'Juan', edad: 30})
})
    
app.listen(PORT, () => {
    console.log(`Server is running on port`);
});