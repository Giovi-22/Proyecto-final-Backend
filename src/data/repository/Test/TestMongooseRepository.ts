//import { IRole } from "../../../domain/entities/Role/IRole";
//import CustomErrors from '../../../shared/CustomErrors';
//import { testModel } from "../../models/Test/testModel";
import { ITestRole } from "../../models/Test/TestAbstract";
import {  testModel } from "../../models/Test/testModel";
import { IRole } from "../../../domain/entities/Role/IRole";
//import { ITestModel } from '../../models/Test/testModel';


class TestMongooseRepository{

    model;
    constructor(){
        this.model = testModel;
    }
    
    async addDataTest(data:ITestRole){
            const result = await this.model.create(data);
            console.log("Los datos creados son: ",result)
    }
    

    async getUser(userId:string){
        const result = await this.model.findById<ITestRole>(userId).populate('role');
        //const result = await this.model.findOne({_id:userId});
        if(result instanceof Object){
            const dbRole = result.role as IRole;
            console.log("Los permisos son: ",dbRole.permissions);
        }
        /*
        if(!result){
            throw new CustomErrors("EL role no se encuentra",{cause:"Bad Request"});
        }
        console.log("El resultado populado: ")
        const populated = await result.populate<{role:IRole}>('role');
        console.log(populated.role.permissions)
        */
    }
}

export default TestMongooseRepository;