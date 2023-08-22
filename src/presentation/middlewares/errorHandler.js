const ERRORS={
    "Bad Request":400,
    "Unauthorized":401,
    "Forbidden":403,
    "Not Found":404,
}

export const errorHandler = (err,req,res,next)=>{
    console.log("el error es: ",err.name)
    if(err?.name?.includes('ZodError')){
        console.log("zon error: ",err.issues)
        return res.status(400).send({status:'error',message:`Error name: ${err.name}`});
    }
    if(err?.name?.includes('MongoServer')){
        console.log('MongoServer error: ',err)
        return res.status(400).send({status:'error',message:`Error name: ${err.name}`});
    }
    return res.status(ERRORS[err?.cause] ?? 500).send({status:'error',message:err.message});
   
}