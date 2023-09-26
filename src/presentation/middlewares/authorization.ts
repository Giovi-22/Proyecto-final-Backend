import { NextFunction } from "connect";
import { Response } from "express";
import { IRequest } from "../../shared/interfaces/custom.interfaces";

export function authorization(permission:string){

    return (req:IRequest,_res:Response,next:NextFunction)=>
    {
        try 
        {
            const user = req.user;
            const permiso = user?.role?.permissions?.includes(permission);
            if (!user.isAdmin && !permiso) {
                throw new Error(`Unauthorized, User does not have permissions to access`);
              }
            next();

        } 
        catch (error) 
        {
            next(error);
        }
    }
}