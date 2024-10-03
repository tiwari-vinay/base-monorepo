
import App from "./app"; 
require("dotenv").config();
import UserController from "./user/user.controller";

const app = new App([new UserController()]); 

app.listen();