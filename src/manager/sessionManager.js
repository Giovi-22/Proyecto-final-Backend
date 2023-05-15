import bcrypt from 'bcrypt';

import { loginValidator } from "../helper/validators.js";
import UserManager from "./userManager.js";

class SessionManager{

    async login(user){
        try {
            if(!user.email && !user.password){
                throw new Error("Todos los campos deben ser completados",{cause:400})
            }
            const userM = new UserManager();
            const userData = await userM.findByFilter({field:"email",value:user.email});
            const isValid = loginValidator(userData,user.password);
            if(!isValid){
                throw new Error('Login failed, invalid password!',{cause:401});
            }
            return {email: userData.email};
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500}); 
        }
    }

    async logout(session){
        try {
            session.destroy((err)=>{
                if(!err){
                    console.log("logout")
                    return 'Logout!';
                }
                throw new Error('logout failed !',{cause:401});
            });
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500});
        }
    }

    async signup(user){
        try {
            const payload = {
                ...user,
                password: await bcrypt.hash(user.password)
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