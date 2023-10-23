import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../domain/entities/User/IUser';
import { config } from '../config';
import { ICredential } from '../domain/managers/Session/ISession';
import CustomErrors from './CustomErrors';

export const jwtGenerator = async(user:IUser,expireTime:string='10m')=>
{
    const userToken:ICredential = {
        user:{
            email:user.email,
            id:user.id,
            isAdmin:user.isAdmin,
            role:user.role
        }
    }
    return jwt.sign(userToken,config.jwtKey,{expiresIn:expireTime});
}

export const verifyJWTToken = async(token: string):Promise<ICredential>=>
{
    try {
        const credential = jwt.verify(token,config.jwtKey) as JwtPayload;
        if(typeof credential === 'object' && credential !== null){
            if(!credential.user){
                throw new CustomErrors("Credentials don't found",{cause: 'Not Found'});
            }
            const result:ICredential = {
                user:{...credential.user}
            }
            return result;
        }else{
            throw new CustomErrors("No se pudo verificar el token",{cause: 'Bad Request'});
        }
    } catch (error) {
       throw new CustomErrors("No se pudo verificar el token",{cause: 'Bad Request'});
    }
}