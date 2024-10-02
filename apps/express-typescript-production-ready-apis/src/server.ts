
import App from "./app"; 
require("dotenv").config();
import UserController from "user/user.controller";

const app = new App([UserController]); 

app.listen(); 
