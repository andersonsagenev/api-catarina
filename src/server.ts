// import express from 'express';
import * as dotenv from 'dotenv';
import  app  from './app';

// const app = express();
dotenv.config();

app.get('/', (req, res) => {
    return res.json({ message: "hello word"});

});

app.listen(3333,() => 
console.log("Server is running..."));

