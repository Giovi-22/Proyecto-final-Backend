import jwt from 'jsonwebtoken';
import { IUser } from '../domain/entities/User/IUser';
import { config } from '../config';

export const jwtGenerator = async(user:IUser)=>
{
    return jwt.sign({user:{...user,password:undefined}},config.jwtKey,{expiresIn:'10m'});
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