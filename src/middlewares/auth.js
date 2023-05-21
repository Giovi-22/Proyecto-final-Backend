import { jwtVerificator } from "../helpers/jsonwebtoken.js";

const auth = async (req,res,next)=>{

    try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const credential = await jwtVerificator(token);
    req.user = credential.user;
    next();
    } catch (error) {
        next({statusCode:403,message:'Error: Authentication error'})
    }
    
}

export default auth;