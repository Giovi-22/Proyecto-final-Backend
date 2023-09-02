import { describe, beforeAll, afterAll, expect } from '@jest/globals'
import UserMongooseRepository from "../data/repository/UserMongooseRepository.js";
import User from "../domain/entities/User.js";
import { generateUser } from "../helpers/fakers.js";
import mongoose from "mongoose";
import { initSupertestServer } from './index.test.js';

describe("Testing user Mongoose Repository",()=>{

        let dataBase;
        let userRepository;
        let currentUser;
        let user;

    beforeAll(async function(){
        const {db} = await initSupertestServer();
        userRepository = new UserMongooseRepository();
        user = new User(generateUser());
        dataBase = db;
    });

    afterAll(async function(){
       return await dataBase.close();
    });

    test("El repository debe ser una instancia de UserMongooseRepository",function(){
        expect(userRepository instanceof UserMongooseRepository).toBeTruthy;
        console.log("El user repository",userRepository)
    });
    test("El repository debe poder crear un usuario",async function(){
        const result = await userRepository.create(user)
        expect(result.firstName).toBe(user.firstName);
        expect(result.lastName).toBe(user.lastName);
        expect(result.email).toBe(user.email);
        expect(result.id instanceof mongoose.Schema.Types.ObjectId).toBeTruthy;
        currentUser = result;
    });

    test("El repository debe devolver un usuario",async function(){
        const result = await userRepository.findById(currentUser.id);
        expect(result).toBeInstanceOf(User);
        expect(result.id).toStrictEqual(currentUser.id);
        expect(result.age).toBeGreaterThan(0);
        expect(result.age).toBe(currentUser.age);
    });

    test("El repository debe poder actualizar un usuario",async function(){
        // data = { field: value}
        const data={age:34,firstName:"polola"}
        const result = await userRepository.update(currentUser.id,data)
        expect(result.age).toBe(data.age);
        expect(result.firstName).toBe(data.firstName)
    });

    test("El repository debe poder borrar un usuario",async function(){
        const result = await userRepository.deleteOne(currentUser.id)
        expect(result).toBe("The user was deleted successfully");
    });

    test("El repository debe devolver un arreglo",async function(){
            const filter = {page:1,limit:5};
            const result = await userRepository.Paginate(filter);
            expect(result.docs).toBeInstanceOf(Array)
    });

    test("El limite de paginate debe ser igual al limite proporcionado",async function(){
        const filter = {page:1,limit:5};
        const result = await userRepository.Paginate(filter)
        expect(result.limit).toBe(filter.limit) 
    });

    test("Error: el limite de paginate no corresponde al limite proporcionado",async function(){
        const filter = {page:1,limit:6};
        const result = await userRepository.Paginate(filter);
        expect(result.limit).not.toBe(5) 
    });

});