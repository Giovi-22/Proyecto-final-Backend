import bcrypt from 'bcrypt';

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