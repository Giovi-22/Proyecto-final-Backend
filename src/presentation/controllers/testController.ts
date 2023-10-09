import { NextFunction, Response } from "express";
import { IRequest } from "../../shared/Interfaces/custom.interfaces";
import TestManager from "../../domain/managers/Test/TestManager";


class TestController{

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
}

export default TestController;