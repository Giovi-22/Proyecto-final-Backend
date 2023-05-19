import jwt from 'jsonwebtoken';


export const jwtGenerator = async(user)=>{
    return jwt.sign({user:{...user,password:undefined}},process.env.JWT_PRIVATE_KEY,{expiresIn:'1m'});
}

export const jwtVerificator = async(user)=>{
    
}