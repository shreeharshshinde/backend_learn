import dotenv from 'dotenv';
import { DB_NAME } from './constants.js';
import express from 'express';
import mongoose from 'mongoose';
import db_connect from './db/index.js';

const app = express();

dotenv.config({ path: './.env' });

db_connect();


/*
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log('database is connected');
        app.on('error', (error)=>{
            console.log("Errror:", error);
            throw error;
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port : ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("MongoDB is not connected", error)
    }
})();
*/