import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET;

// Middleware de autenticación JWT
const autenticarJWT = (req, res, next) => {
  const tokenHeader = req.headers['token_usuario'];
  const tokenCookie = req.cookies?.token_usuario;
  
  const token = tokenHeader || tokenCookie;

  if (!token) {
    return res.status(403).json({ 
      mensaje: 'Acceso denegado: Token no proporcionado' 
    });
  }

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ 
        mensaje: 'Acceso denegado: Token inválido o expirado' 
      });
    }

    // Guardar información del usuario en la petición
    req.usuario = usuario;
    next();
  });
};

export default autenticarJWT;