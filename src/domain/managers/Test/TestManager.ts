import { ITestModel } from "../../../data/models/testModel";
import TestMongooseRepository from "../../../data/repository/Test/TestMongooseRepository";

class TestManager{

    testRepository;

    constructor(){
        this.testRepository = new TestMongooseRepository();
    }

    async addNewTest(data:ITestModel){
        return this.testRepository.addDataTest(data);
    }
    async getUser(userId:string){
        return this.testRepository.getUser(userId);
    }

}

export default TestManager;