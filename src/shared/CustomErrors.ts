class CustomErrors extends Error{
    
    cause:Cause;
    constructor(message:string,cause:{cause:string}){
        super(message);
        this.cause = cause;
    }
    }

export default CustomErrors;

interface Cause{
    cause:string
}