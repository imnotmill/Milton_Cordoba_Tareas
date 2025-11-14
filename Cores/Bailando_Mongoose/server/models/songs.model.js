import mongoose from 'mongoose';

const cancionesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        minlength: [6, 'El título debe tener al menos 6 caracteres'],
        maxlength: [255, 'El título no puede exceder los 255 caracteres'],
        required: [true, 'El campo "titulo" es obligatorio']
    },
    artista: {
        type: String,
        minlength: [10, 'El artista debe tener al menos 10 caracteres'],
        maxlength: [255, 'El artista no puede exceder los 255 caracteres'],
        required: [true, 'El campo "artista" es obligatorio']
    },
    lanzamiento: {
        type: Number,
        required: [true, 'El campo "lanzamiento" es obligatorio'],
        min: [1900, 'El año de lanzamiento no puede ser anterior a 1900'],
        max: [2025, 'El año de lanzamiento no puede ser posterior a 2025'],
        validate: {
          validator: function (v) {
            return Number.isInteger(v) && v >= 1000 && v <= 9999;
          },
          message: 'El campo "lanzamiento" debe ser un número entero de 4 dígitos'
        }
    },
    genero: {
        type: String,
         required: [true, 'El campo "genero" es obligatorio']
    }
}, { timestamps: true });

const Cancion = mongoose.model('Cancion', cancionesSchema);

export default Cancion;