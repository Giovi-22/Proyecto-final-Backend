import jwt from 'jsonwebtoken';
import { IUser } from '../domain/entities/User/IUser';
import { config } from '../config';

export const jwtGenerator = async(user:IUser,expireTime:string='10m')=>
{
    return jwt.sign({user:{...user,password:undefined}},config.jwtKey,{expiresIn:expireTime});
}

export const jwtVerificator = async (token:string)=>
{   
    const result = jwt.verify(token,config.jwtKey,(err,credential)=>{
        if(err)
        {
            throw new Error("Bad Request Authentication error, invalid o expired jwt");
        }
        return credential;
     });
     return result;
}