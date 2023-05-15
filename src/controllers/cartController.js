import CartManager from "../manager/CartManager.js"

class CartController{

    static create = async (req,res,next)=>{
        try {
            const cartM = new CartManager();
            const newCart = await cartM.createCart({products:[]});
            res.status(201).json({status:"success",data:newCart});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static addOne = async (req,res,next)=>{
        const {cid,pid} = req.params;
        try {
            const cartM = new CartManager();
            const newCart =  await cartM.addOne(cid,pid);
            return res.status(200).json({status:"success",data:newCart});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
        }
    }
    
    static updateCart = async (req,res,next)=>{
        const cid = req.params.cid;
        const data = req.body;
        try {
            const cartM = new CartManager();
            const updatedCart = await cartM.updateAll(cid,data);
            res.status(200).json({status:"success",data:updatedCart});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static updateOne = async (req,res,next)=>{
        const {cid,pid} = req.params;
        const data = req.body;      
        try {
            const cartM = new CartManager();
            const updatedCart = await cartM.updateOne(cid,pid,data.quantity);
            res.status(200).json({status:"success",data:updatedCart});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }
    static getAll = async (req,res,next)=>{
        try {
            const cartM = new CartManager();
            const carts = await cartM.getAll();
            res.status(200).json({status:"success",data:carts});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static get = async (req,res,next)=>{
        const cid = req.params.cid;
        try {
            const cartM = new CartManager();
            const cart = await cartM.getOne(cid);
            res.status(200).json({status:"success",data:cart});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static deleteAll = async (req,res,next)=>{
        const cid = req.params.cid;
        try {
            const cartM = new CartManager();
            const result = await cartM.deleteAll(cid);
            res.status(200).json({status:"success",data:result});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static deleteOne = async (req,res,next)=>{
        const {cid,pid} = req.params;
        try {
            const cartM = new CartManager();
            const result = await cartM.deleteOne(cid,pid);
            res.status(200).json({status:"success",data:result});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }
}

export default CartController;