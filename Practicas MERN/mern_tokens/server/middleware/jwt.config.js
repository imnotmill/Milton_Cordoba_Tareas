import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const LLAVE_SECRETA = process.env.SECRET_KEY || 'clave_predeterminada';

// Middleware de autenticación
const autenticarJWT = (req, res, next) => {
  const token = req.cookies?.tokenUsuario;

  if (!token) {
    return res.status(403).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
  }

  jwt.verify(token, LLAVE_SECRETA, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Acceso denegado: Token inválido o expirado' });
    }

    req.usuario = usuario;
    next();
  });
};

export default autenticarJWT;