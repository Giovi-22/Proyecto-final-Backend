import { NextFunction, Response } from 'express'
import { jwtVerificator } from "../../shared/jsonwebtoken";
import { IRequest } from '../../shared/interfaces/custom.interfaces';


const auth = async (req:IRequest,_res:Response,next:NextFunction)=>{

    try {
    const authHeader = req.headers?.authorization;
    if(!authHeader){
        throw new Error('Bad Request, authorization has not been sent');
    }
    const token = authHeader.split(' ')[1];

    const credential = await jwtVerificator(token);
    console.log("Las credenciales: ",credential)
    //req.user = credential.user;
    next();
    
    } catch (error) {
        next(error)
    }
    
}

export default auth;