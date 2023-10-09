import { userModel } from "../../models/userModel";


class TestMongooseRepository{

    model;
    constructor(){
        this.model = userModel;
    }

    async getUser(userId:string){
        const result = await this.model.findOne({_id:userId});
        console.log("El resultado es: ",result);
    }
}

export default TestMongooseRepository;