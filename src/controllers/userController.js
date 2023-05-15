import UserManager from "../manager/userManager.js";

class UserController{

    static async insert(req,res){
        const newUser = req.body;
        try {
            const uManager = new UserManager();
            const result = await uManager.insert(newUser);
            return res.status(200).json({status:"success",data:result});
        } catch (error) {
            throw new Error(error.message);
        }

    }

    static async list(req,res){
        const options = {
            ...req.query,
            query: JSON.parse(`{${req.query?.filter || ""}}`)
        }
        
        try {
            const uManager = new UserManager();
            const result = await uManager.getList(options);
            return res.status(200).json({status:"success",data:result.docs, ...result, docs:undefined });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getOne(req,res){
        const uid = req.params.uid;
        
        try {
            const uManager = new UserManager();
            const user = await uManager.getById(uid);
            return res.status(200).json({status:"success",data:user});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateOne(req,res){
        const uid = req.params.uid;
        const data = req.body;
        
        try {
            const uManager = new UserManager();
            const userUpdated = await uManager.updateOne(uid,data);
            return res.status(200).json({status:"success",data:userUpdated});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteOne(req,res){
        const uid = req.params.uid;
        try {
            const uManager = new UserManager();
            const result = await uManager.deleteOne(uid);
            return res.status(200).json({status:"success",data:result});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default UserController;