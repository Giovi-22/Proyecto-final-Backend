import {  Model } from "mongoose";


class Test extends Model{

    constructor(){
        super();
    }
    static async findUser(userId:string){
        const result = await this.findById({_id:userId});
        console.log("El ressultado: ",result)

        return result; 
    }

}

export default Test;