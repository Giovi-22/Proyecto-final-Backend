
import ProductManager from '../../domain/managers/ProductManager.js';
class ProductC{

    static createProduct = async (req,res,next)=>
    {
            try
            {
                const pManager = new ProductManager();
                const newProduct = await pManager.create(req.body,req.user);
                res.status(201).json({status:'success',data:newProduct});
            }
            catch (error)
            {
                next(error);
            }
    }

    static getProducts = async (req,res,next)=>
    {
        const options = {
            limit: +req.query?.limit || 10,
            page: +req.query?.page || 1,
            sort: +req.query?.sort || "", //los valores que recibe para ordenar por precio pueden ser 1 (de menor a mayor) y -1 (de mayor a menor)
            filter:JSON.parse(`{${req.query.filter ?? ""}}`) //filter se pasa por query de la siguiente forma: "productField":"value"
        }
        console.log("Las opciones son: ",options)
        try
        {
            const pManager = new ProductManager();
            const products = await pManager.get(options);
            res.status(200).json({status:'success',data:{products:products.docs,...products,docs:undefined}});
        }
        catch (error)
        {
            next(error);
        }
    }

    static getOneProduct = async (req,res,next)=>
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


    static updateProduct = async (req,res,next)=>
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

    static deleteProduct = async (req,res,next)=>
    {
        const pid = req.params.pid;
        try
        {
            const pManager = new ProductManager();
            const productDeleted = await pManager.deleteOne(pid,req.user);
            res.status(200).json({status:'success',data:productDeleted});
        }
        catch (error)
        {
            next(error);
        }
    }

}

export default ProductC;