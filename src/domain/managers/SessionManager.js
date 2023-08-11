
import { hashPassword, verifyPassword } from '../../helpers/bcrypt.js';
import { jwtGenerator, jwtVerificator,  } from '../../helpers/jsonwebtoken.js';
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
        const userAccessToken = await jwtGenerator({...userDB,password:undefined})
        return userAccessToken;
    }

    async signup(user)
    {
        await userZodSchema.parseAsync(user);
        const newUser = await this.userM.create(user);
        return newUser;
    }

    async forgotPassword(email,serverUrl){
        const dbUser = await this.userM.findByFilter({field:"email",value:email});
        const emailM = new EmailManager();
        const jwtForgotPassword = await jwtGenerator(dbUser,"5min");
        const result = await emailM.send(dbUser.email,"Change password",{user:dbUser,jwt:jwtForgotPassword,url:serverUrl},"forgotPassword.hbs") 
        return result;
}

async changePassword(password, confirmedPassword, token){
    
    //to do: si el cambio de password se realizo correctamente, poner el token en una blacklist
    // para que no pueda volver a usarse hasta que expire.

    if(password !== confirmedPassword){
        throw new Error("Change password failed, the password and confirmedPassword do not match",{cause:'Bad Request'});
    }
    const credential = await jwtVerificator(token);
    const user = await this.userM.findByFilter({field:"email",value:credential.user.email});
    const newHashPassword = await hashPassword(password);
    const updatedUser = await this.userM.updateOne(user.id.toString(),{password:newHashPassword});
    return updatedUser;
}
}

export default SessionManager;