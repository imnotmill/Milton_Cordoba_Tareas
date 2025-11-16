import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET;


const validateToken = (req,res, next)=>{
    const {token_user} = req.headers;
    
    if(!token_user){
        return res.status(401).json({message: "Token no proporcionado"})
    }
    
    jwt.verify(token_user, SECRET, (err, decoded)=> {
        if(err){
            console.log("Error validando token:", err.message);
            return res.status(403).json({message: "Token inválido o expirado"})
        }
        req.infoUser = decoded;
        next()
    } )
}

export default validateToken;