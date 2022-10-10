import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './src/routes/routes';


dotenv.config();


const app = express();

mongoose.connect(process.env.DB_URL as string, () => {
    console.log("connected to db")
})

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('dev'));

app.use("/", router)



app.listen(parseInt(process.env.PORT as string), ()=>{
    console.log(`App started on Port ${process.env.PORT}`)
});