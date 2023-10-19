import { NextFunction, Response } from "express";
import { IRequest } from "../../shared/Interfaces/custom.interfaces";
import UserManager from "../../domain/managers/User/UserManager";

class UserController{

    static async create(req:IRequest,res:Response,next:NextFunction)
    {
        const newUser = req.body;
        try
        {
            const uManager = new UserManager();
            const result = await uManager.create(newUser);
            return res.status(201).json({status:"success",data:result});
        }
        catch (error)
        {
            return next(error);
        }

    }
/*
    static async list(req:IRequest,res:Response,next:NextFunction)
    {
        const options = {
            ...req.query,
            query: JSON.parse(`{${req.query?.filter ?? ""}}`)
        }
        
        try
        {
            const uManager = new UserManager();
            const result = await uManager.getList(options);
            return res.status(200).json({status:"success",data:result.docs, ...result, docs:undefined });
        }
        catch (error)
        {
            return next(error);
        }
    }
*/
    static async getOne(req:IRequest,res:Response,next:NextFunction)
    {
        const uid = req.params.uid;
        try
        {

            const uManager = new UserManager();
            const user = await uManager.getById(uid);
            return res.status(200).json({status:"success",data:user});
        } 
        catch (error)
        {
            return next(error);
        }
    }

    static async updateOne(req:IRequest,res:Response,next:NextFunction)
    {
        const uid = req.params.uid;
        const data = req.body;
        try
        {         
            const uManager = new UserManager();
            const userUpdated = await uManager.updateOne(uid,data);
            return res.status(200).json({status:"success",data:userUpdated});
        }
        catch (error)
        {
            return next(error);
        }
    }

    static async deleteOne(req:IRequest,res:Response,next:NextFunction)
    {
        const uid = req.params.uid;
        try
        {
            const uManager = new UserManager();
            const result = await uManager.deleteOne(uid);
            return res.status(200).json({status:"success",message:result.message});
        }
        catch (error)
        {
            return next(error);
        }
    }
}

export default UserController;