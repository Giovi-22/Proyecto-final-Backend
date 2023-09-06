import UserManager from "../../domain/managers/UserManager.js";

class UserController{

    static async create(req,res,next)
    {
        console.log("dentro de create")
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
        console.log("dentro de list")
        const options = {
            ...req.query,
            query: JSON.parse(`{${req.query?.filter ?? ""}}`)
        }
        
        try
        {
            console.log("Dentro del controller")
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
            console.log("dentro de getOne")
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
        console.log("dentro de updateOne")
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
        console.log("dentro de deleteOne")
        const uid = req.params.uid;
        try
        {
            const userM = new UserManager();
            const result = await userM.deleteOne(uid);
            return res.status(200).json({status:"success",message:result});
        }
        catch (error)
        {
           return next(error);
        }
    }

    static async changeRole(req,res,next){
        try {
            console.log("dentro de change role")
            const userM = new UserManager();
            const result = await userM.premiumUser(req.params.uid)
            return res.status(200).send({status:'success',message:'Role updated successfully',data:result});
        } catch (error) {
            return next(error);
        }
    }

    static async loadDocuments(req,res,next)
    {
        console.log("dentro de load documents")
        try 
        {

            /* req.files -> contiene un objeto  en donde la key es el fieldname y el valor es un array con los archivos el archivo subidos:
            req.file = {
                        key                 value
                (fieldname)-profile:[{(archivo)->fieldname:'profile',destination:'....',path:'...'etc}],
                (fieldname)-product:[{(archivo)->fieldname:'product',destination:'....',path:'...'etc}],
                (fieldname)-document:[{(archivo)->fieldname:'document',destination:'....',path:'...'etc}]

            }
            */
        
            if(!req.files)
            {
                return res.status(400).send({status:'failed',message:'A file has not been provided'});
            }
            const filesDto={};
            if(req.files['profiles']){
                filesDto.profiles = req.files['profiles'].map(file=>({name:file.filename,reference:file.destination}))
            }
            if(req.files['products']){
                filesDto.products = req.files['products'].map(file=>({name:file.filename,reference:file.destination}))
            }
            if(req.files['documents']){
                filesDto.documents = req.files['documents'].map(file=>({name:file.filename,reference:file.destination}))
            }

            const userM = new UserManager();
            const result = await userM.loadDocuments(req.params.uid,filesDto);
            return res.status(200).send({status:'success',message:'Uploaded file successfully',data:result});
        } catch (error)
         {
          return next(error);  
        }
    }

}

export default UserController;