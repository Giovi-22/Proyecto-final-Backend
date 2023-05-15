import bcrypt from 'bcrypt';

export const loginValidator = async (user,password)=>{
    const isHashedPassword = await bcrypt.compare(password,user.password);
    return isHashedPassword;
}

export const userValidator = (user)=>{
    const requiredUserField = ['firstName','lastName','email','password','age'];

    const isValid = requiredUserField.every(field => user[field]);
    if(!isValid){
        throw new Error("Debe ingresar todos los campos requeridos",{cause:401});
    }
    return user; 
}