import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

dotenv.config();
const SECRET = process.env.SECRET;

// Función auxiliar para generar token JWT
const generarToken = (usuario) => {
  // Excluye la contraseña del objeto usuario
  const { contraseña, ...usuarioAll } = usuario;
  return jwt.sign(usuarioAll, SECRET, { expiresIn: '10m' });
};

// Controlador de registro
const registrar = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !apellido || !correo || !contraseña) {
      return res.status(400).json({ 
        mensaje: 'Todos los campos son obligatorios',
        errores: {
          nombre: !nombre ? 'El nombre es obligatorio' : undefined,
          apellido: !apellido ? 'El apellido es obligatorio' : undefined,
          correo: !correo ? 'El correo es obligatorio' : undefined,
          contraseña: !contraseña ? 'La contraseña es obligatoria' : undefined
        }
      });
    }

    // Validar longitud mínima de contraseña
    if (contraseña.length < 8) {
      return res.status(400).json({ 
        mensaje: 'La contraseña debe tener al menos 8 caracteres',
        errores: {
          contraseña: 'La contraseña debe tener al menos 8 caracteres'
        }
      });
    }

    // Crear el usuario (el modelo se encarga de encriptar la contraseña)
    const nuevoUsuario = await Usuario.create({ nombre, apellido, correo, contraseña });

    // Generar token JWT con toda la info del usuario (sin contraseña)
    const usuarioObj = nuevoUsuario.toObject();
    const token = generarToken(usuarioObj);

    // Devolver respuesta exitosa con token
    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente',
      token
    });

  } catch (error) {
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errores = {};
      Object.keys(error.errors).forEach(key => {
        errores[key] = error.errors[key].message;
      });
      return res.status(400).json({ 
        mensaje: 'Error de validación',
        errores 
      });
    }

    // Manejar error de correo duplicado
    if (error.code === 11000) {
      return res.status(400).json({ 
        mensaje: 'El correo ya está registrado',
        errores: {
          correo: 'Este correo ya está en uso'
        }
      });
    }

    res.status(500).json({ 
      mensaje: 'Error al registrar usuario',
      error: error.message 
    });
  }
};

// Controlador de login
const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Validar que correo y contraseña estén presentes
    if (!correo || !contraseña) {
      return res.status(400).json({ 
        mensaje: 'Correo y contraseña son obligatorios',
        errores: {
          correo: !correo ? 'El correo es obligatorio' : undefined,
          contraseña: !contraseña ? 'La contraseña es obligatoria' : undefined
        }
      });
    }

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(401).json({ 
        mensaje: 'Credenciales inválidas',
        errores: {
          correo: 'El correo no está registrado'
        }
      });
    }

    // Verificar contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ 
        mensaje: 'Credenciales inválidas',
        errores: {
          contraseña: 'La contraseña es incorrecta'
        }
      });
    }

    const usuarioObj = usuario.toObject();
    const token = generarToken(usuarioObj);

    res.status(200).json({ 
      mensaje: 'Login exitoso',
      token
    });

  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al realizar login',
      error: error.message 
    });
  }
};

export { registrar, login, generarToken };