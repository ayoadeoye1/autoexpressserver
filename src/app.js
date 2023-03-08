import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/main.routes.js';
dotenv.config();

const app = express();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async() =>{
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: "motorhub",
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log(`DB connected!`)
    } catch (error) {
        console.log(`DB connection error: ${error}`);
    }
}

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

export default app;