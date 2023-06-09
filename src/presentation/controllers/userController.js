import UserManager from "../../domain/managers/UserManager.js";

class UserController{

    static async create(req,res,next)
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
            next(error);
        }

    }

    static async list(req,res,next)
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
            next(error);
        }
    }

    static async getOne(req,res,next)
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
            next(error);
        }
    }

    static async updateOne(req,res,next)
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
            next(error);
        }
    }

    static async deleteOne(req,res,next)
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
            next(error);
        }
    }
}

export default UserController;