import { User } from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET;

const userController = {
    getAll: async (req, res) => {
        try {
            const allUsers = await User.find(); 
            return res.status(201).json(allUsers);
        } catch (e) {
            res.status(400).json(e)
        }
  },
    createOne: async (req, res) => {
        const { firstname, lastname, email, password, passwordConfirm } = req.body;
        const newUserData = { firstname, lastname, email, password };
        try {
            const newUser = new User(newUserData);
            newUser.passwordConfirm = passwordConfirm;
            await newUser.save();

            const token = {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                id: newUser._id
            }
            jwt.sign(token, SECRET, {expiresIn: "1m"}, (err, tokenGenerated) => {
                return res.status(201).json({ token: tokenGenerated })              
            })

        }catch (e) {
            let messages = {};
            if(e.name === "ValidationError"){
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                })
            }
            return res.status(400).json({errors : {...messages}})
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const currentUser = await User.findOne({email});
        if(!currentUser){
            return res.status(400).json({errors: {email: "El email no es válido"}})
    }
    const isPasswordValid = await bcrypt.compare(password, currentUser.password)
    if(!isPasswordValid){
        return res.status(400).json({errors: {password: "La contraseña no es válida"}})
    }
    
    const token = {
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            email: currentUser.email,
            id: currentUser._id
      }
       jwt.sign(token, SECRET, {expiresIn: "1m"}, (err, tokenGenerated) => {
                return res.status(201).json({ token: tokenGenerated })              
            })
}
}
export default userController;