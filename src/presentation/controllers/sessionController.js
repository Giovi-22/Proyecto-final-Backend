
import SessionManager from "../../domain/managers/SessionManager.js";

class SessionController{


    static async login(req,res,next)
    {
        try
        {
            const sessionM = new SessionManager();
            const accessToken = await sessionM.login(req.body);
            return res.cookie('user',accessToken,{maxAge:(60*1000)*10}).send({message:'Login success',data:accessToken});
        } 
        catch (error)
        {
            next(error);
        }
    }

    static async current(req,res,next)
    {
        try 
        {
            res.status(200).send({status:'success',payload:req.user});
        }
        catch (error)
        {
            next(error);
        }
    }
    static async logout(req,res,next)
    {
        try
        {
            req.session.destroy((err)=>
            {
                if(!err)
                {
                    return res.status(200).send({status:'success',message:'Logout!'});
                }
                throw new Error(`logout failed!, Error: ${err}`);
            });
        }
        catch (error)
        {
            next(error);
        }
    }

    static async signup(req,res,next)
    {
        try
        {
            console.log("Dentro de signup, los datos: ",req.body)
            const sessionM = new SessionManager();
            const newUser = await sessionM.signup(req.body);
            res.status(201).send({status:'success',data:newUser});
        }
        catch (error)
        {
            next(error);
        }
    }

    static async changePassword(req,res,next){
        try {
            //to do: terminar de armar la ruta
            const {password, confirm, email} = req.body;
            const sessionM  = new SessionManager();
            const updatedUser = await sessionM.changePassword(password,confirm,req.user,email);
            return res.status(200).send({status:"success",data:updatedUser,message:"Password updated successfully"});
        } catch (error) {
            return next(error);
        }
    }

    static async forgotPassword(req,res,next){
        try {
            const serverUrl = `${req.protocol}://${req.get('host')}`;
            const sessionM = new SessionManager();
            await sessionM.forgotPassword(req.body.email,serverUrl);
            return res.status(200).send({status:'success',message:'An email has beent sent to reset the password'});
        } catch (error) {
            return next(error);
        }
    }

    static async changePasswordView(req,res,next){
        try {
            return res.render('restorePassword');
        } catch (error) {
            return next(error);
        } 
    }

    static async restorePassword(req,res,next){
        try {
            const { password, confirm } = req.body;
            const sessionM  = new SessionManager();
            const updatedUser = await sessionM.changePassword(password,confirm,req.user);
            return res.status(200).send({status:"success",data:updatedUser,message:"Password updated successfully"});
        } catch (error) {
            return next(error);
        }
    }

}

export default SessionController;