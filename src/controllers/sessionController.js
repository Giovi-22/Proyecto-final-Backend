import SessionManager from "../manager/sessionManager.js";

class SessionController{


    static async login(req,res){
        try {
            const sessionM = new SessionManager();
            const user = await sessionM.login({...req.body});
            req.session.user = user;
            return res.send({message:`Login success`})
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500});
        }
    }

    static async logout(req,res){
        try {
            const sessionM = new SessionManager();
            const logout = await sessionM.logout(req.session);
            console.log(logout)
            res.status(200).send({status:'success',message:logout});
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500});
        }
    }

    static async signup(req,res){
        try {
            const sessionM = new SessionManager();
            const newUser = await sessionM.signup(req.body);
            res.status(201).send({status:'success',data:newUser});
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500});
        }
    }

    static async filter(req,res){
        try {
            const sessionM = new SessionManager();
            const user = await sessionM.findFilter({...req.body});
        } catch (error) {
            throw new Error(error.message,{cause:error?.cause || 500});
        }
    }


}

export default SessionController;