const auth = (req,res,next)=>{

    if(req.session?.user?.email && req.session?.user?.admin){
        return next();
    }
    return res.status(401).send({status:'error', message:'Error de autorización'})
}

export default auth;