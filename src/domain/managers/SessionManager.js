import { verifyPassword } from '../../helpers/bcrypt.js';
import { jwtGenerator,  } from '../../helpers/jsonwebtoken.js';
import { loginValidation, userZodSchema } from '../validations/validators.js';
import UserManager from './userManager.js';

class SessionManager{

    async login(user)
    {
        await loginValidation.parseAsync(req.body);
        const userM = new UserManager();
        const userDB = await userM.findByFilter({field:'email',value:user.email});
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
        await userZodSchema.parseAsync(req.body);
        const userM = new UserManager();
        const newUser = await userM.create(user);
        return newUser;
    }
}

export default SessionManager;