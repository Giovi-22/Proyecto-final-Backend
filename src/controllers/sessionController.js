import { loginValidation, userZodSchema } from "../helpers/validators.js";
import SessionManager from "../managers/SessionManager.js";

class SessionController{


    static async login(req,res,next){
        try {
            await loginValidation.parseAsync(req.body);
            const sessionM = new SessionManager();
            const accessToken = await sessionM.login({...req.body});
            return res.status(200).send({message:'Login success',data:accessToken});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static async current(req,res,next){
        try {
            res.status(200).send({status:'success',payload:req.user});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
        }
    }
    static async logout(req,res,next){
        try {
            req.session.destroy((err)=>{
                if(!err){
                    return res.status(200).send({status:'success',message:'Logout!'});
                }
                throw new Error('logout failed !');
            });
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

    static async signup(req,res,next){
        try {
            await userZodSchema.parseAsync(req.body);
            const sessionM = new SessionManager();
            const newUser = await sessionM.signup(req.body);
            res.status(201).send({status:'success',data:newUser});
        } catch (error) {
            next(error);
            return;
        }
    }

}

export default SessionController;