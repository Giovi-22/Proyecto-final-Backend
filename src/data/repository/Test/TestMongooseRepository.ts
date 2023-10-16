//import { IRole } from "../../../domain/entities/Role/IRole";
import { IRole } from '../../../domain/entities/Role/IRole';
import CustomErrors from '../../../shared/CustomErrors';
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
        const result = await this.model.findOne({_id:userId});
        console.log("El resultado es: ",result);
        if(!result){
            throw new CustomErrors("EL role no se encuentra",{cause:"Bad Request"});
        }
        console.log("El resultado populado: ")
        const populated = await result.populate<{role:IRole}>('role');
        console.log(populated.role.permissions)
    }
}

export default TestMongooseRepository;