import { IRole } from "../../../domain/entities/Role/IRole";
import { ITestModel, testModel } from '../../models/testModel';


class TestMongooseRepository{

    model;
    constructor(){
        this.model = testModel;
    }
    async addDataTest(data:ITestModel){
            const result = await this.model.create(data);
            console.log("Los datos creados son: ",result)
    }

    async getUser(userId:string){
        const result = await this.model.findOne({_id:userId}).populate<{role:IRole}>('role');
        console.log("El resultado es: ",result);
    }
}

export default TestMongooseRepository;