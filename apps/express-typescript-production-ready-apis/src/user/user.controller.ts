import userModel from './user.model'
import Controller from 'interface/interface.controller'
import { Request,Response, NextFunction, Router } from 'express'


class UserController implements Controller {
    public path = "/user"
    public router = Router();

    constructor(){
        this.initilizeRoutes();
    }

    private intitializeRoutes(){
        this.router.get(`${this.path}/:id`, this.getUserById)
    }

    private getUserById(req: Request, res: Response, next: NextFunction){
        const user = this.userService.getUserById(req.params.id);
    }
    
}

export default UserController;