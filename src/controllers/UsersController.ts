import { Request, Response } from "express";
import  User  from "../models/User";

// import UsersService from "@services/UsersService";

class UsersController {

   public async index(request: Request, response: Response) {

       // const usersService = new UsersService();
       const users = await User.find()
       // const users =  await usersService.findAllUsers();

        return response.json(users);
    }

}

export default new UsersController()