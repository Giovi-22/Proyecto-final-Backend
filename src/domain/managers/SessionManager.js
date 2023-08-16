
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
        const jwtForgotPassword = await jwtGenerator({...dbUser,password:undefined},"5min");
        const result = await emailM.send(dbUser.email,"Change password",{user:dbUser,jwt:jwtForgotPassword,url:serverUrl},"forgotPassword.hbs") 
        return result;
}

async changePassword(password, confirmedPassword, user, email){
    
    //to do: si el cambio de password se realizo correctamente, poner el token en una blacklist
    // para que no pueda volver a usarse hasta que expire.
    // revisar la seguridad. si un usuario entra a esta ruta con un jwt valido puede cambiar el password de otra persona

    if(password !== confirmedPassword){
        throw new Error("Changing password failed, the password and confirmedPassword do not match",{cause:'Bad Request'});
    }
    const userDb = await this.userM.findByFilter({field:"email",value:user.email});
    if(email){
        if(userDb.email !== email){
            throw new Error("Changing password failed, authorization required",{cause:'Bad Request'});  
        }
    }
    
    const areEqual = await verifyPassword(userDb.password,password);
    if(areEqual){
        throw new Error("The new password can't be equal as the previous one.");
    }
    const newHashPassword = await hashPassword(password);
    const updatedUser = await this.userM.changePassword(userDb.id.toString(),newHashPassword);
    return updatedUser;
}
}

export default SessionManager;