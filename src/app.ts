import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes  from './routes';
import path from 'path';
import cors from 'cors';

const DB_URL= process.env.MONGO_URL

class App{

    public server: express.Application

    constructor(){

        this.server = express();
        dotenv.config();

       
        this.dataBase();
        this.middlewares();
        this.routes();
    }

    dataBase() {

        mongoose.connect('mongodb+srv://malandro:malandro@devapi.cyoyt.mongodb.net/dbMandrake?retryWrites=true&w=majority',
        { useNewUrlParser: true, 
          useUnifiedTopology: true
        })
       .then(() => console.log('connecting to database successful')).catch(err => 
       console.log('could not connect to mongo DB', err));
       
    }

    middlewares(){

        this.server.use(cors());

        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
          );

        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;