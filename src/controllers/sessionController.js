import SessionManager from "../manager/sessionManager.js";

class SessionController{


    static async login(req,res,next){
        try {
            const sessionM = new SessionManager();
            const user = await sessionM.login({...req.body});
            req.session.user = user;
            return res.send({message:`Login success`})
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
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
            const sessionM = new SessionManager();
            const newUser = await sessionM.signup(req.body);
            res.status(201).send({status:'success',data:newUser});
        } catch (error) {
            next({statusCode:error.cause || 500, message:error.message});
            return;
        }
    }

}

export default SessionController;