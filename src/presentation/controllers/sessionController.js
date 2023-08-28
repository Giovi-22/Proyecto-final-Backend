
import SessionManager from '../../domain/managers/SessionManager.js';
import BlackListManager from '../../domain/managers/BlackListManager.js'
class SessionController{


    static async login(req,res,next)
    {
        try
        {
            const sessionM = new SessionManager();
            const accessToken = await sessionM.login(req.body);
            req.session.token = accessToken;
            return res.status(200).cookie('user',accessToken,{maxAge:(60*1000)*10}).send({status:'success', message:'Login success',data:accessToken});
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
            res.status(200).send({status:'success',data:req.user});
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
                throw new Error(`logout failed!, Error: ${err}`,{cause: 'Bad Request'});
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
            const {password, confirm} = req.body;
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const sessionM  = new SessionManager();
            const blackListM = new BlackListManager();
            const isOnBlacklist = await blackListM.isOnBlackList(token);
            if(isOnBlacklist){
                return res.status(401).send({status:'error',message:'The user does not have access to change the password'})
            }
            const updatedUser = await sessionM.changePassword(password,confirm,req.user);
            await blackListM.add(token)
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

}

export default SessionController;