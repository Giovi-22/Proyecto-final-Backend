

export const productValidator = (req,res,next)=>{
            const arrayOfKeys = ["code","title","description","price","thumbnail","stock","status","category"];
            const product = req.body;
            const isValid = arrayOfKeys.every((key)=> product[key]);
            if(!isValid){
                
                return next({statusCode:400, message:"Todos los campos deben ser completados"});
            }
            return next();
}