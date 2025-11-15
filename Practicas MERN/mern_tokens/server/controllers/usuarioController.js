import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';

dotenv.config();
const SECRET = process.env.SECRET;

const registrar = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    const usuarioObj = usuario.toObject();
    delete usuarioObj.password;
    const token = generarToken(usuarioObj);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ msg: 'Error al registrar usuario', error });
  }
};

const generarToken = (usuario) => {
  return jwt.sign(usuario, SECRET, { expiresIn: '1h' });
};

export { registrar, generarToken };