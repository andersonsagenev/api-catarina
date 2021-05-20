import { Response, Request } from 'express';
import User from '../models/User';

interface IUserInterface  {
   name: string;
   email: string;
   password?: string;
   passwordResetToken?: string;
   passwordResetExpires?: Date;
 }

class UsersService {


   //   async findAllUsers() {

   //    console.log('entrou no find')

   //    const users = await User.find()

   //    return users;

   //  }

   //  public async index( req: Request, res: Response): Promise<Response> {

   //    const users = await User.find()

   //    return res.json(users);
   //  }

    // async create(email: string){

    //   //  const userExists = await this.usersRepository.findOne({ email });

    //     if (userExists) {
    //        return userExists;
    //     }
       
    //     const user = this.usersRepository.create({
    //       email
    //     });
    
    //     await this.usersRepository.save(user);

    //     return user;

    // }

    // async findByEmail( email: string) {

    //     const user = await this.usersRepository.findOne(email);

    //     return user;
    // }

}

export default UsersService;