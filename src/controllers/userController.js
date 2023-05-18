import { userZodSchema } from "../helper/validators.js";
import UserManager from "../manager/userManager.js";

class UserController{

    static async create(req,res,next){
        const newUser = req.body;
        try {
            await userZodSchema.parseAsync(req.body);
            const uManager = new UserManager();
            const result = await uManager.create(newUser);
            return res.status(200).json({status:"success",data:result});
        } catch (error) {
            next(error);
        }

    }

    static async list(req,res,next){
        const options = {
            ...req.query,
            query: JSON.parse(`{${req.query?.filter || ""}}`)
        }
        
        try {
            const uManager = new UserManager();
            const result = await uManager.getList(options);
            return res.status(200).json({status:"success",data:result.docs, ...result, docs:undefined });
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static async getOne(req,res,next){
        const uid = req.params.uid;
        try {
            const uManager = new UserManager();
            const user = await uManager.getById(uid);
            return res.status(200).json({status:"success",data:user});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static async updateOne(req,res,next){
        const uid = req.params.uid;
        const data = req.body;
        try {
            const uManager = new UserManager();
            const userUpdated = await uManager.updateOne(uid,data);
            return res.status(200).json({status:"success",data:userUpdated});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static async deleteOne(req,res,next){
        const uid = req.params.uid;
        try {
            const uManager = new UserManager();
            const result = await uManager.deleteOne(uid);
            return res.status(200).json({status:"success",message:result});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }
}

export default UserController;