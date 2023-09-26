
import { NextFunction, Response } from "express";
import SessionManager from "../../domain/managers/SessionManager";
import { IRequest } from "../../shared/interfaces/custom.interfaces.js";

class SessionController{


    static async login(req:IRequest,res:Response,next:NextFunction)
    {
        try
        {
            const sessionM = new SessionManager();
            const accessToken = await sessionM.login(req.body);
            return res.cookie('user',accessToken,{maxAge:(60*1000)*10}).send({message:'Login success',data:accessToken});
        } 
        catch (error)
        {
            return next(error);
        }
    }

    static async current(req:IRequest,res:Response,next:NextFunction)
    {
        try 
        {
           return res.status(200).send({status:'success',payload:req.user});
        }
        catch (error)
        {
           return next(error);
        }
    }
    static async logout(req:IRequest,res:Response,next:NextFunction)
    {
        try
        {
            req.session.destroy((err)=>
            {
                if(!err)
                {
                    return res.status(200).send({status:'success',message:'Logout!'});
                }
                throw new Error(`logout failed!, Error: ${err}`);
            });
        }
        catch (error)
        {
           return next(error);
        }
    }

    static async signup(req:IRequest,res:Response,next:NextFunction)
    {
        try
        {
            const sessionM = new SessionManager();
            const newUser = await sessionM.signup(req.body);
            return res.status(201).send({status:'success',data:newUser});
        }
        catch (error)
        {
            return next(error);
        }
    }

    static async forgotPassword(req:IRequest,res:Response,next:NextFunction){
        try {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const sessionM = new SessionManager();
            await sessionM.forgotPassword(req.body.email,serverUrl);
            return res.status(200).send({status:'success',message:'An email has beent sent to reset the password'});
        } catch (error) {
            return next(error);
        }
    }

    static async changePassword(_req:IRequest,res:Response,next:NextFunction){
        try {
            return res.render('restorePassword');
        } catch (error) {
            return next(error);
        } 
    }

    static async restorePassword(req:IRequest,res:Response,next:NextFunction){
        try {
            const {password, confirm, token} = req.body;
            const sessionM  = new SessionManager();
            const updatedUser = await sessionM.changePassword(password,confirm,token);
            return res.status(200).send({status:"success",data:updatedUser,message:"Password updated successfully"});
        } catch (error) {
            return next(error);
        }
    }

}

export default SessionController;