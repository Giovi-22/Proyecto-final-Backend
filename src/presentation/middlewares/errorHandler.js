const ERRORS={
    "Bad Request":400,
    "Unauthorized":401,
    "Forbidden":403,
    "Not Found":404,
}

export const errorHandler = (err,req,res,next)=>{
    console.log("la ruta es: ",req.url),
    console.log("El error: ",err)
    if(err?.name?.includes('ZodError')){
        return res.status(400).send(
            {
                status:'error',
                error:
                    {
                        name:err.name,
                        issues: err.issues
                    }
            });
    }
    if(err?.name?.includes('Mongo')){
        return res.status(400).send(
            {
                status:'error',
                error:
                    {
                        name:err.name,
                        code:err.code,
                        keyValue: err.keyValue 
                    }
            });
    }

    return res.status(ERRORS[err?.cause] ?? 500).send(
      {
        status:'error',
        error:
        {
          name: err?.name || "",
          message:err.message
        }
      });
}
