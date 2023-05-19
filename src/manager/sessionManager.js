import { verifyPassword } from "../helper/bcrypt.js";
import UserManager from "./UserManager.js";

class SessionManager{

    async login(user){
        try {
            const userM = new UserManager();
            const userDB = await userM.findByFilter({field:"email",value:user.email});
            const isValid = await verifyPassword(userDB.password,user.password);
            if(!isValid){
                throw new Error('Login failed, invalid password!');
            }
            if(userDB.firstName === 'Giovanni'){
                return {email: userDB.email,admin:true};
            }
            return {email: userDB.email,admin:false};
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500}); 
        }
    }

    async signup(user){
        try {
            const userM = new UserManager();
            const newUser = await userM.create(user);
            return newUser;
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500});
        }
    }
}

export default SessionManager;