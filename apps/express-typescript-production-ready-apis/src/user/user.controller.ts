import userModel from './user.model'
import Controller from 'interface/interface.controller'
import { Request,Response, NextFunction, Router } from 'express'
import UserService from './user.service';
import User from './user.interface';

class UserController implements Controller {
    public path;
    public router;
    public userService = new UserService();

    constructor(){
        this.path = '/user'
        this.router = Router();
        this.initilizeRoutes();
    }

    private initilizeRoutes(){
        this.router.get(`${this.path}/check`, (req,res)=>res.send("serving this route"))
        this.router.get(`${this.path}/:id`, this.getUserById)
        this.router.post(`${this.path}`, this.createUser)
        this.router.put(`${this.path}/:id`, this.updateUser)
        this.router.delete(`${this.path}/:id`, this.deleteUser)
    }

    private getUserById = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            console.log("control reached to getuserbid funcito");
            const user = await this.userService.getUserById(req.params.id);
            if(user){
                res.status(200).json(
                    user);
            }
            else{
                res.status(404).json({
                    message: 'User not found'
                });
            }

        } catch(err){
            next(err);
        }
    }
    private createUser = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            console.log("control reached create controller");
            
            const user = await this.userService.createUser(req.body);
            res.status(200).json(user);
        } catch(err){
            next(err);
        }
    }
    private updateUser = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const user = await this.userService.updateUser(req.params.id, req.body);
            if(user){
                res.status(200).json(user);
            }
            else{
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch(err){
            next(err);
        }
    }

    private deleteUser = async (req:Request, res:Response, next:NextFunction)=>{
        try{
            const user = await this.userService.deleteUser(req.params.id); 
            if(user){
                res.status(200).json(user);
            }
            else{
                res.status(404).json({
                    message: 'User not found',
                })
            }
        } catch(err){
            next(err);
        }
    }
}

export default UserController;