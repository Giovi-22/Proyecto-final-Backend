import bcrypt from 'bcrypt';
import z from 'zod';

export const productZodSchema = z.object({
    code: z.string({required_error:'code is required',invalid_type_error:'code must be a string'}),
    title:z.string({required_error:'title is required',invalid_type_error:'title must be a string'}),
    description:z.string({required_error:'description is required',invalid_type_error:'description must be a string'}),
    price:z.number({required_error:'price is required',invalid_type_error:'price must be a number'}),
    thumbnail:z.array(z.string({required_error:'thumnail is required',invalid_type_error:'thumbail must be a string'})),
    stock:z.number({required_error:'stock is required',invalid_type_error:'stock must be a number'}),
    status:z.boolean({required_error:'status is required',invalid_type_error:'status must be a boolean'}),
    category:z.string({required_error:'category is required',invalid_type_error:'category must be a string'})
})

export const loginValidator = async (userDB,password)=>{
    const isHashedPassword = await bcrypt.compare(password,userDB.password);
    return isHashedPassword;
}

export const userValidator = async (user)=>{
    const requiredUserField = ['firstName','lastName','email','password','age'];

    const isValid = requiredUserField.every(field => user[field]);
    if(!isValid){
        throw new Error("Debe ingresar todos los campos requeridos",{cause:401});
    }
    const hashedPassword = await bcrypt.hash(user.password,10);
    user = {...user,password:hashedPassword};
    return user; 
}