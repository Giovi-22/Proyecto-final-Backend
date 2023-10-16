import { NextFunction, Response } from "express";
import { IRequest } from "../../shared/Interfaces/custom.interfaces";
import TestManager from "../../domain/managers/Test/TestManager";


class TestController{

    static async newData(req:IRequest,res:Response,next:NextFunction){
        try {
            const testM = new TestManager();
            console.log("test running");
            await testM.addNewTest(req.body);
            res.send('<h2>Test is running</h2>');
        } catch (error) {
            next(error);
        }
    }

    static async testGet(req:IRequest,res:Response,next:NextFunction){
        try {
            const testM = new TestManager();
            console.log("test running");
            const result = await testM.getUser(req.body.userId);
            console.log("EL usuario es: ",result)
            res.send('<h2>Test is running</h2>');
        } catch (error) {
            next(error);
        }
    }

    static async getCart(req:IRequest,res:Response,next:NextFunction){
        try {
            const testM = new TestManager();
            const result = await testM.getCart(req.body.cid);
            console.log('El resultado es: ',result)
            res.send(result);
        } catch (error) {
           next(error); 
        }
    }
    static async updateCart(req:IRequest,res:Response,next:NextFunction){
        try {
            console.log("El cart id es: ",req.params.cid)
            const testM = new TestManager();
            const result = await testM.updateCart(req.params.cid,req.body);
            console.log('El resultado es: ',result)
            res.send(result);
        } catch (error) {
           next(error); 
        }
    }

    static async findById(req:IRequest,res:Response,next:NextFunction){
        try {
            console.log("El cart id es: ",req.params.cid)
            const testM = new TestManager();
            const result = await testM.findById(req.params.cid);
            console.log('El resultado es: ',result)
            res.send(result);
        } catch (error) {
           next(error); 
        }
    }
}

export default TestController;