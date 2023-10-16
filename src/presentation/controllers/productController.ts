
import ProductManager from '../../domain/managers/ProductManager';
import { Request, Response, NextFunction} from 'express';
import { IRequest } from '../../shared/Interfaces/custom.interfaces';
import { IPaginationFilters } from '../../shared/Interfaces/IShared';
class ProductController{

    static addProduct = async (req:IRequest,res:Response,next:NextFunction)=>
    {
            try
            {
                const pManager = new ProductManager();
                const newProduct = await pManager.add(req.body);
                res.status(201).json({status:'success',data:newProduct});
            }
            catch (error)
            {
                next(error);
            }
    }

    static getProducts = async (req:Request,res:Response,next:NextFunction)=>
    {
        const options:IPaginationFilters = {
            limit: Number(req.query.limit) ?? 10,
            page: Number(req.query.page) ?? 1,
            sort: Number(req.query.sort) ?? "", //los valores que recibe para ordenar por precio pueden ser 1 (de menor a mayor) y -1 (de mayor a menor)
            filter:JSON.parse(`{${req.query.filter ?? ""}}`) //filter se pasa por query de la siguiente forma: "productField":"value"
        }
        try
        {
            const pManager = new ProductManager();
            const products = await pManager.get(options);
            res.status(200).json({status:'success',payload:products.docs,...products,docs:undefined});
        }
        catch (error)
        {
            next(error);
        }
    }

    static getOneProduct = async (req:Request,res:Response,next:NextFunction)=>
    {
        const pid = req.params.pid;
        try
        {
            const pManager = new ProductManager();
            const product = await pManager.getOne(pid);
            res.status(200).json({status:'success',data:product});
        }
        catch (error)
        {
            next(error);
        }
    }


    static updateProduct = async (req:Request,res:Response,next:NextFunction)=>
    {
        const pid = req.params.pid;
        const data = req.body;
        try
        {
            const pManager = new ProductManager();
            const productUpdated = await pManager.update(pid,data);
            res.status(200).json({status:'success',data:productUpdated});
        }
        catch (error)
        {
            next(error);
        }
    }

    static deleteProduct = async (req:Request,res:Response,next:NextFunction)=>
    {
        const pid = req.params.pid;
        try
        {
            const pManager = new ProductManager();
            const productDeleted = await pManager.deleteOne(pid);
            res.status(200).json({status:'success',data:productDeleted});
        }
        catch (error)
        {
            next(error);
        }
    }

}

export default ProductController;