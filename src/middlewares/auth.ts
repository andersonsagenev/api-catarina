import { IUserInterface } from './../interfaces/UserInterface';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';
import User from '../models/User';

class AuthMiddleware {

    public async authorizationByToken(req: Request, res: Response, next: NewableFunction): Promise<Response | void> {

        const authHeader = req.headers.authorization;
       // const token = req.query.token || req.headers['x-access-token'];

      if(!authHeader)
      return res.status(401).send( { error: 'No token provided' });

      const parts = authHeader.split(' ');
      const [ scheme, espaco, token ] = parts;
     
    
        try {
            const userToken =  jwt.verify(token, authConfig.secret) as IUserInterface;
            const user = await User.findById(userToken.id);

            if(!user) {
                return res.status(400).send({ message: 'User not found'});
            }
            req.user = user;
            return next();
      
        } catch (error) {
            return res.status(401).send( { error: 'Token error' });
        }
     };

}

export default new AuthMiddleware();


// CONFIG COM JS

// export default (req: Request, res: Response, next) => {

//     const authHeader = req.headers.authorization;
   
//     if(!authHeader)
//     return res.status(401).send( { error: 'No token provided' });

//     const parts = authHeader.split(' ');

//     if(!parts.length == 2)
//     return res.status(401).send( { error: 'Token error' });

//     const [ scheme, token ] = parts;

//     if(!/^Bearer$/i.test(scheme))
//     return res.status(401).send( { error: 'Token malformatted' });

//     jwt.verify(token, authConfig.secret, (err, decoded) => {
//         if (err) return res.status(401).send( { error: 'Invalid Token' });

//         req.userId = decoded.id;
//         return next();
//     });
//}