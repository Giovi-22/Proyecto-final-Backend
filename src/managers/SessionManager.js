import { verifyPassword } from "../helpers/bcrypt.js";
import { jwtGenerator } from "../helpers/jsonwebtoken.js";
import UserManager from "./userManager.js";

class SessionManager{

    async login(user){
        try {
            const userM = new UserManager();
            const userDB = await userM.findByFilter({field:"email",value:user.email});
            const isValid = await verifyPassword(userDB.password,user.password);
            if(!isValid){
                throw new Error('Login failed, invalid password!');
            }
            const userAccessToken = await jwtGenerator(userDB)
            return userAccessToken;
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