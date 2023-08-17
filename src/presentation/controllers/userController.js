import UserManager from "../../domain/managers/UserManager.js";

class UserController{

    static async create(req,res,next)
    {
        const newUser = req.body;
        try
        {
            const userM = new UserManager();
            const result = await userM.create(newUser);
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
            const userM = new UserManager();
            const result = await userM.getList(options);
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

            const userM = new UserManager();
            const user = await userM.getById(uid);
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
            const userM = new UserManager();
            const userUpdated = await userM.updateOne(uid,data);
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
            const userM = new UserManager();
            const result = await userM.deleteOne(uid);
            return res.status(200).json({status:"success",message:result.message});
        }
        catch (error)
        {
           return next(error);
        }
    }

    static async changeRole(req,res,next){
        try {
            const dto={
                role: req.body.role
            }
            const userM = new UserManager();
            const result = await userM.updateOne(req.params.uid,{role:dto.role})
            return res.status(200).send({status:'success',message:'Role updated successfully',data:result});
        } catch (error) {
            return next(error);
        }
    }

    static async uploadFile(req,res,next)
    {
        try 
        {
            if(!req.file)
            {
                return res.status(400).send({status:'failed',message:'A file has not been provided'});
            }
            return res.status(200).send({status:'success',message:'Uploaded file successfully'});
        } catch (error)
         {
          return next(error);  
        }
    }
}

export default UserController;