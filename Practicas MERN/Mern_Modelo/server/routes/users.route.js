import { Router } from 'express';
import userController from '../controllers/users.controller.js';

const routerUsers = Router();

routerUsers.get('/', userController.getAll);
routerUsers.post('/new', userController.createOne);
routerUsers.post('/login', userController.login);

export default routerUsers;