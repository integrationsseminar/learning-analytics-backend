import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './src/routes/routes';
import errorMiddleware from './src/middleware/error.middleware';
import cors from "cors"


dotenv.config();


const app = express();

app.use(cors)

mongoose.connect(process.env.DB_URL as string, () => {
    console.log("Connected to MongoDB")
});


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('dev'));

app.use("/", router);

app.use("/", (_req, res) => {
    res.status(405).send("Not implemented")
})

app.use(errorMiddleware)



app.listen(parseInt(process.env.PORT as string), () => {
    console.log(`App started on Port ${process.env.PORT}`)
});