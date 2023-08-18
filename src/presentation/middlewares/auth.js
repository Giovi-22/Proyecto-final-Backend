import { jwtVerificator } from "../../helpers/jsonwebtoken.js";


const auth = async (req,res,next)=>{
    try {
    const authHeader = req.headers?.authorization;
    if(!authHeader){
        throw new Error('Error: authorization has not been sent',{cause:'Bad Request'});
    }
    const token = authHeader.split(' ')[1];
    const credential = await jwtVerificator(token);
    req.user = credential.user;
    next();
    
    } catch (error) {
        next(error)
    }
    
}

export default auth;