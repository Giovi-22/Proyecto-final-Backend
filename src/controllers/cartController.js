import { idValidation, updateCartValidation } from "../helpers/validators.js";
import CartManager from "../managers/CartManager.js"

class CartController{

    static create = async (req,res,next)=>
    {
        try
        {
            const cartM = new CartManager();
            const newCart = await cartM.createCart({products:[]});
            res.status(201).json({status:"success",data:newCart});
        }
        catch (error)
        {
            next(error);
        }
    }

    static addOne = async (req,res,next)=>
    {
        const {cid,pid} = req.params;
        try
        {
            idValidation.parse(cid);
            idValidation.parse(pid);
            const cartM = new CartManager();
            const newCart =  await cartM.addOne(cid,pid);
            return res.status(200).json({status:"success",data:newCart});
        }
        catch (error)
        {
            next(error);
        }
    }
    
    static updateCart = async (req,res,next)=>
    {
        const cid = req.params.cid;
        const data = req.body;
        console.log(data)
        try
        {
            idValidation.parse(cid);
            await updateCartValidation.parseAsync(data);
            const cartM = new CartManager();
            const updatedCart = await cartM.updateAll(cid,data);
            res.status(200).json({status:"success",data:updatedCart});
        }
        catch (error)
        {
            next(error);
        }
    }

    static updateOne = async (req,res,next)=>
    {
        console.log("updete one")
        const {cid,pid} = req.params;
        const data = req.body;      
        try
        {
            idValidation.parse(cid);
            idValidation.parse(pid);
            const cartM = new CartManager();
            const updatedCart = await cartM.updateOne(cid,pid,data.quantity);
            res.status(200).json({status:"success",data:updatedCart});
        }
        catch (error)
        {
            next(error);
        }
    }

    static getAll = async (req,res,next)=>
    {
        try
        {
            const cartM = new CartManager();
            const carts = await cartM.getAll();
            res.status(200).json({status:"success",data:carts});
        }
        catch (error)
        {
            next(error);
        }
    }

    static get = async (req,res,next)=>
    {
        console.log("dentro del get")
        const cid = req.params.cid;
        try
        {   
            idValidation.parse(cid);
            const cartM = new CartManager();
            const cart = await cartM.getOne(cid);
            res.status(200).json({status:"success",data:cart});
        }
        catch (error)
        {
            next(error);
        }
    }

    static deleteAll = async (req,res,next)=>
    {
        const cid = req.params.cid;
        try
        {
            idValidation.parse(cid);
            const cartM = new CartManager();
            const result = await cartM.deleteAll(cid);
            res.status(200).json({status:"success",data:result});
        }
        catch (error)
        {
            next(error);
        }
    }

    static deleteOne = async (req,res,next)=>
    {
        const {cid,pid} = req.params;
        try
        {
            idValidation.parse(cid);
            idValidation.parse(pid);
            const cartM = new CartManager();
            const result = await cartM.deleteOne(cid,pid);
            res.status(200).json({status:"success",data:result});
        }
        catch (error)
        {
            next(error);
        }
    }
}

export default CartController;