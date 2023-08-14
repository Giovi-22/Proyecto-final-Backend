import { NextFunction, Request, Response } from "express";
import { jwtVerificator } from "../../shared/jsonwebtoken.js";


const auth = async (req:Request,res:Response,next:NextFunction)=>{

    try {
    const authHeader = req.headers?.authorization;
    if(!authHeader){
        throw new Error('Bad Request, authorization has not been sent');
    }
    const token = authHeader.split(' ')[1];

    const credential = await jwtVerificator(token);
    req.user = credential.user;
    next();
    
    } catch (error) {
        next(error)
    }
    
}

export default auth;