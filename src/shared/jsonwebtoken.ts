import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../domain/entities/User/IUser';
import { config } from '../config';
import { ICredential } from '../domain/managers/Session/ISession';

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


export const verifyTokenV2 = async(token: string):Promise<ICredential>=>
{
    try {
        const credential = await jwt.verify(token,config.jwtKey) as JwtPayload;
        console.log("EL resultado de las credenciales: ")
        console.log(credential)
        if(typeof credential === 'object' && credential !== null){
            if(!credential.user){
                throw new Error("No se encuentran las credenciales")
            }
            const result:ICredential = {
                user:{...credential.user}
            }
            return result;
        }else{
            throw new Error("No se pudo verificar el token")
        }
    } catch (error) {
       throw new Error("no se pudo verificar el token") 
    }
}