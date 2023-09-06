
export function authorization(permission){
    return (req,res,next)=>
    {
        try 
        {
            const user = req.user;
            const permiso = user?.role?.permissions?.includes(permission);
            if (!user.isAdmin && !permiso) {
                throw new Error(`Error: User does not have permissions to access`,{cause:'Unauthorized'});
              }
            next();

        } 
        catch (error) 
        {
            next(error);
        }
    }
}