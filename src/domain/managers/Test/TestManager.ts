import TestMongooseRepository from "../../../data/repository/Test/TestMongooseRepository";

class TestManager{

    testRepository;

    constructor(){
        this.testRepository = new TestMongooseRepository();
    }

    async getUser(userId:string){
        return this.testRepository.getUser(userId);
    }

}

export default TestManager;