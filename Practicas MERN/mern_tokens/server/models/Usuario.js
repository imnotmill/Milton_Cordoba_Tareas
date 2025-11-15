import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/, 'Correo no válido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6
  }
}, { timestamps: true });

// Hash de contraseña antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;