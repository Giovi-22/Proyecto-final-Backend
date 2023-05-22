import jwt from 'jsonwebtoken';


export const jwtGenerator = async(user)=>
{
    return jwt.sign({user:{...user,password:undefined}}, process.env.JWT_PRIVATE_KEY,{expiresIn:'10m'});
}

export const jwtVerificator = async (token)=>
{   
    const result = jwt.verify(token,process.env.JWT_PRIVATE_KEY,(err,credential)=>{
        if(err)
        {
            throw new Error("Authentication error, invalid o expired jwt",{cause:"Bad Request"});
        }
        return credential;
     });
     return result;
}