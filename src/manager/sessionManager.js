import bcrypt from 'bcrypt';

import { loginValidator } from "../helper/validators.js";
import UserManager from "./userManager.js";

class SessionManager{

    async login(user){
        try {
            if(!user?.email || !user?.password){
                throw new Error("Todos los campos deben ser completados",{cause:400})
            }
            const userM = new UserManager();
            const userDB = await userM.findByFilter({field:"email",value:user.email});
            const isValid = await loginValidator(userDB,user.password);
            if(!isValid){
                throw new Error('Login failed, invalid password!',{cause:401});
            }
            return {email: userDB.email};
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500}); 
        }
    }

    async signup(user){
        try {
            const passwordHashed = await bcrypt.hash(user.password,10);
            const payload = {
                ...user,
                password: passwordHashed
            }
            const userM = new UserManager();
            const newUser = await userM.insert(payload);
            return newUser;
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500});
        }
    }

    async findFilter(user){
        try {
            if(!user.email && !user.password){
                throw new Error("Todos los campos deben ser completados",{cause:400})
            }
            const userM = new UserManager();
            const userData = await userM.findByFilter({field:"email",value:user.email});
            console.log(userData)
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500}); 
        }
    }

}

export default SessionManager;