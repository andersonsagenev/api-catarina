import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import auth from './middlewares/auth';

import ProductController from './controllers/ProductController';
import UsersController  from "./controllers/UsersController";
import AuthController from './controllers/AuthController';

const routes = Router();
const upload = multer(uploadConfig);

 routes.post('/authenticate', AuthController.authenticate);
 routes.post('/forgot_password', AuthController.forgot_password);
 routes.post('/reset_password', AuthController.reset_password);
 routes.post('/product', auth.authorizationByToken, upload.single('thumbnail'), ProductController.store);

  routes.get('/users', auth.authorizationByToken, UsersController.index);
  routes.get('/products', auth.authorizationByToken, ProductController.index);
  routes.post('/register', AuthController.store);

export default routes;