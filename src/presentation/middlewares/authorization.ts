import { NextFunction } from "connect";
import { Request, Response } from "express";

export function authorization(permission:string){

    return (req:Request,res:Response,next:NextFunction)=>
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