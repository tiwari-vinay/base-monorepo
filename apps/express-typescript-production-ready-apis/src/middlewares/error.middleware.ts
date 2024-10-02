import { Request, Response, NextFunction } from "express";
import httpexception from "exceptions/http.exception";

function errorMiddleware(error: httpexception, req: Request, res: Response, next: NextFunction){
    const status = error.status || 500; 
    const message = error.message || "something went wrong"
    res.status(status).send({
        message, 
        status
    })
}

export default errorMiddleware;