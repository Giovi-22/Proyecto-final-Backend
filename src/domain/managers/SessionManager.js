
import { verifyPassword } from '../../helpers/bcrypt.js';
import { jwtGenerator,  } from '../../helpers/jsonwebtoken.js';
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
}

export default SessionManager;