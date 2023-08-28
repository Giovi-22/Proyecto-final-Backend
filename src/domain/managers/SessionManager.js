
import { hashPassword, verifyPassword } from '../../helpers/bcrypt.js';
import { jwtGenerator } from '../../helpers/jsonwebtoken.js';
import { loginValidation, userZodSchema } from '../validations/validators.js';
import EmailManager from './EmailManager.js';
import UserManager from './UserManager.js';

class SessionManager{

    constructor(){
        this.userM = new UserManager();
    }

    async login(user)
    {
        await loginValidation.parseAsync(user);
        const userDB = await this.userM.findByFilter({field:'email',value:user.email});
        const isValid = await verifyPassword(userDB.password,user.password);
        if(!isValid)
        {
            throw new Error('Login failed, invalid password!',{cause:'Bad Request'});
        }
        await this.userM.updateOne(userDB.id.toString(),{lastConnection:new Date().toUTCString()})
        const userAccessToken = await jwtGenerator({...userDB,password:undefined})
        return userAccessToken;
    }

    async signup(user)
    {
        await userZodSchema.parseAsync(user);
        user.isAdmin=false;
        user.role="647fd20fb16b39892de4c6aa";
        const newUser = await this.userM.create(user);
        return newUser;
    }

    async forgotPassword(email,serverUrl){
        const dbUser = await this.userM.findByFilter({field:"email",value:email});
        const emailM = new EmailManager();
        const jwtForgotPassword = await jwtGenerator({...dbUser,password:undefined},"5min");
        const result = await emailM.send(dbUser.email,"Change password",{user:dbUser,jwt:jwtForgotPassword,url:serverUrl},"forgotPassword.hbs") 
        return result;
}

async changePassword(password, confirmedPassword, user){
    
    //to do: si el cambio de password se realizo correctamente, poner el token en una blacklist
    // para que no pueda volver a usarse hasta que expire.

    if(password !== confirmedPassword){
        throw new Error('The password and confirmedPassword do not match',{cause:'Bad Request'});
    }
    const userDb = await this.userM.findByFilter({field:'email',value:user.email});

    const areEqual = await verifyPassword(userDb.password,password);

    if(areEqual){
        throw new Error('The new password can not be equal as the previous one.');
    }
    const newHashPassword = await hashPassword(password);
    const updatedUser = await this.userM.changePassword(userDb.id.toString(),newHashPassword);
    return updatedUser;
}
}

export default SessionManager;