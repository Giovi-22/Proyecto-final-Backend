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
        console.log('MongoServer error: ',err)
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

    return res.status(ERRORS[err?.cause] ?? 500).send({status:'error',message:err.message});
   
}

/*
ZodErrors:
      type: object
      properties:
        name:
          type: string
          description: Nombre del paquete que produjo el error.
        issues:
          type: array
          items:
            example:
              [
                {
                  code: invalid_type,
                  expected: string,
                  received: 'undefined',
                  path: ['email'],
                  message: email is required
                }
              ]
            */