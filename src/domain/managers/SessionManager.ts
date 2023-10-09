
import CustomErrors from '../../shared/CustomErrors';
import { hashPassword, verifyPassword } from '../../shared/bcrypt';
import { jwtGenerator, verifyTokenV2  } from '../../shared/jsonwebtoken';
import { IUser } from '../entities/User/IUser';
import { loginValidation, userZodSchema } from '../validations/validators';
import EmailManager from './EmailManager';
import UserManager from './UserManager';

class SessionManager{

    #userM;
    constructor(){
        this.#userM = new UserManager();
    }

    async login(user:IUser)
    {
        await loginValidation.parseAsync(user);
        const userDB = await this.#userM.findByFilter({field:'email',value:user.email});
        const isValid = await verifyPassword(userDB.password,user.password);
        if(!isValid)
        {
            throw new CustomErrors('Login failed, invalid password!',{cause:'Bad Request'});
        }
        const userAccessToken = await jwtGenerator({...userDB})
        return userAccessToken;
    }

    async signup(user:IUser)
    {
        await userZodSchema.parseAsync(user);
        const newUser = await this.#userM.create(user);
        return newUser;
    }

    async forgotPassword(email:string,serverUrl:string){
        const dbUser = await this.#userM.findByFilter({field:"email",value:email});
        const emailM = new EmailManager();
        const jwtForgotPassword = await jwtGenerator(dbUser,"5min");
        const result = await emailM.send(dbUser.email,"Change password",{user:dbUser,jwt:jwtForgotPassword,url:serverUrl},"forgotPassword.hbs") 
        return result;
}

async changePassword(password:string, confirmedPassword:string, token:string){
    
    //to do: si el cambio de password se realizo correctamente, poner el token en una blacklist
    // para que no pueda volver a usarse hasta que expire.

    if(password !== confirmedPassword){
        throw new CustomErrors("Change password failed, the password and confirmedPassword do not match",{cause:'Bad Request'});
    }
    const credential = await verifyTokenV2(token);
    const user = await this.#userM.findByFilter({field:"email",value:credential.user.email});
    const newHashPassword = await hashPassword(password);
    const updatedUser = await this.#userM.updateOne(user.id.toString(),{password:newHashPassword});
    return updatedUser;
}
}

export default SessionManager;