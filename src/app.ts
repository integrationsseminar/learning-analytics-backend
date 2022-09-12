import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import { sequelize } from './db/database.connection';
import { CourseRouter } from './routes/course.routes';
import { PingRouter } from './routes/ping.router';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('dev'));

sequelize.sync({ alter: true }).then(()=>{
    console.log('database setup successfully');
}).catch(err => console.log(err));

app.use('/courses', CourseRouter);
app.use('/ping', PingRouter)

app.listen(parseInt(process.env.PORT as string), ()=>{
    console.log(`App started on Port ${process.env.PORT}`)
});