import bcrypt from 'bcrypt';

export const hashPassword = async (password)=>
{
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword; 
}

export const verifyPassword = async (userDBPassword,password)=>
{
    const isHashedPassword = await bcrypt.compare(password,userDBPassword);
    return isHashedPassword;
}