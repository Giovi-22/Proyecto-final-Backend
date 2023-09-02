import { describe, beforeAll, afterAll, expect } from '@jest/globals'
import mongoose from 'mongoose';

import RoleRepository from "../../data/repository/RoleRepository.js";
import Role from "../../domain/entities/Role.js";
import { initSupertestServer } from '../index.test.js';


describe("Testing role Mongoose Repository",()=>{

    let roleRepository;
    let currentRole;
    let dataBase;

    beforeAll(async function(){
        const {db} = await initSupertestServer();
        roleRepository = new RoleRepository();
        dataBase = db;
    });

    afterAll(async function(){
        return await dataBase.close();
     });

    test("El repository debe ser una instancia de RoleRepository",function(){
        expect(roleRepository instanceof RoleRepository).toBeTruthy;
    });

    test("El repository debe poder crear un role", async function(){
        const data = {name:"admin", permissions:[]}
        const result =  await roleRepository.create(data);
        expect(result instanceof Role).toBeTruthy;
        expect(result.id instanceof mongoose.Schema.Types.ObjectId).toBeTruthy;
        expect(result.name).toBe(data.name);
        expect(result).toHaveProperty('permissions');
        currentRole = result;
    });

    test("El repository debe poder devolver un role",async function(){
        const result = await roleRepository.getOne(currentRole.id);
        expect(result instanceof Role).toBeTruthy;
        expect(result.id instanceof mongoose.Schema.Types.ObjectId).toBeTruthy;
        expect(result.id).toStrictEqual(currentRole.id);
        expect(result.name).toBe(currentRole.name);
        expect(result).toHaveProperty("permissions");
    });

    test("El repository debe poder actualizar los permisos",async function(){
        const permissions=["getCart"];
        const result = await roleRepository.updatePermission(currentRole.id,permissions);
        expect(result instanceof Role).toBeTruthy;
        expect(result.id instanceof mongoose.Schema.Types.ObjectId).toBeTruthy;
        expect(result.id).toStrictEqual(currentRole.id);
        expect(result.permissions.length).toBeTruthy;
    })
});