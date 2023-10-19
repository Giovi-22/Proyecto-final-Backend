//import { ICartProduct } from "../../../data/models/Cart/ICartModel";
import { ITestRole } from "../../../data/models/Test/TestAbstract";
import CartMongooseRepository from "../../../data/repository/CartMongooseRepository";
import TestMongooseRepository from "../../../data/repository/Test/TestMongooseRepository";
import { ICart } from "../../entities/Cart/ICart";

class TestManager{

    testRepository;
    cartRepository;

    constructor(){
        this.testRepository = new TestMongooseRepository();
        this.cartRepository = new CartMongooseRepository();
    }

    async addNewTest(data:ITestRole){
        return this.testRepository.addDataTest(data);
    }
    async getUser(userId:string){
        return this.testRepository.getUser(userId);
    }

    async getCart(cid:string){
        const result = await this.cartRepository.findOne(cid);
        console.log("El cart es: ",result);
        return;
    }

    async updateCart(cid:string,data:ICart){
        const result = await this.cartRepository.update(cid,data);
        console.log("El producto fue acutualizado: ",result)
    }

    async findById(cid:string){
        const result = await this.cartRepository.findById(cid);
        console.log("El producto fue acutualizado: ",result)
    }

}

export default TestManager;