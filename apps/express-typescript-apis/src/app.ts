import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router/index';

dotenv.config();
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});
// is body parser a middleware?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

const URL =
  'mongodb+srv://itcgel:HO2SvVZMossUdMe6@cluster0.mximc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO_URL || URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.listen(process.env.PORT || 3001, () =>
  console.log('listening on port 3001')
);
