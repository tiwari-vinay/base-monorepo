import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import Controller from './interface/interface.controller';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Application;

  constructor(controller: Controller[]) {
    this.app = express();
    this.initilizeControllers(controller);
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeErrorHandlers();
  }

  public listen() {
    this.app.listen(process.env.PORT || 3003, () => {
      console.log(`application started on port ${process.env.PORT || 3003}`);
    });
  }
  public getServer() {
    return this.app;
  }

  private initilizeControllers(Controllers: Controller[]) {
    Controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
  private connectToDatabase() {
    mongoose
      .connect(process.env.MONGOURL!)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => console.log('Error connecting to MongoDB', err));
  }
  private initializeMiddlewares() {
    // initialize middlewares here
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
  private initializeErrorHandlers() {
    // initialize error handlers here
    this.app.use(errorMiddleware);
  }
}

export default App;
