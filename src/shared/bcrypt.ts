import bcrypt from 'bcrypt';

export const hashPassword = async (password:string)=>
{
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword; 
}

export const verifyPassword = async (userDBPassword:string,password:string)=>
{
    const isHashedPassword = await bcrypt.compare(password,userDBPassword);
    return isHashedPassword;
}