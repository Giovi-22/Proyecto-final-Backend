import { NextFunction, Response } from 'express'
import { verifyJWTToken } from "../../shared/jsonwebtoken";
import { IRequest } from '../../shared/Interfaces/custom.interfaces';



const auth = async (req:IRequest,_res:Response,next:NextFunction)=>{

    try {
        
    const authHeader = req.headers?.authorization;
    if(!authHeader){
        throw new Error('Bad Request, authorization has not been sent');
    }
    const token = authHeader.split(' ')[1];

    const credential = await verifyJWTToken(token);
    console.log("Las credenciales: ",credential)
    req.user = credential.user;
    return next();
    } catch (error) {
        next(error)
    }
    
}

export default auth;