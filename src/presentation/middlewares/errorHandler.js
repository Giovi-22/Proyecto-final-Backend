const ERRORS={
    "Bad Request":400,
    "Unauthorized":401,
    "Forbidden":403,
    "Not Found":404,
}

export const errorHandler = (err,req,res,next)=>{
    
    if(err?.name?.includes('ZodError')){
        console.log("zon error: ",err.issues)
        return res.status(400).send({status:'error',message:err.issues});
    }
    return res.status(ERRORS[err?.cause] ?? 500).send({status:'error',message:err.message});
   
}