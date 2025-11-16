import mongoose from "mongoose";

const peliculaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [5, "El título debe tener al menos 5 caracteres"],
      required: [true, "El título es obligatorio"],
      unique: true
    },
    year: {
      type: Number,
      min: [1888, "El año debe ser mayor o igual a 1888"],
      max: [new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`],
      required: [true, "El año es obligatorio"]
    },
    director: {
      type: String,
      minlength: [5, "El director debe tener al menos 5 caracteres"],
      required: [true, "El director es obligatorio"]
    },
    genre: {
      type: String,
      minlength: [3, "El género debe tener al menos 3 caracteres"],
      required: [true, "El género es obligatorio"]
    },
    img: {
      type: String,
      required: [true, "La URL de la imagen es obligatoria"],
      validate: {
        validator: function(v) {
          if (!v) return false;
          return /^(https?:\/\/).+\.(png|jpg|jpeg|gif|webp|bmp|svg)(\?.*)?$/i.test(v);
        },
        message: props => `${props.value} no es una URL de imagen válida`
      }
    }
  },
  { timestamps: true }
);

const Pelicula = mongoose.model("peliculas", peliculaSchema);
export { Pelicula, peliculaSchema };