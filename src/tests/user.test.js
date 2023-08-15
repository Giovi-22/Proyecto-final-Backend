import { describe, beforeAll, afterAll, expect } from '@jest/globals'
import supertest from 'supertest';
import { initSupertestServer } from './index.test';
import _ from 'mongoose-paginate-v2';



describe('Testing User Endpoints',()=>{

    let dataBase;
    let application;
    let appRequester;
    let appServer;

    beforeAll(async ()=>
    {
        const {app, db } = await initSupertestServer();
        application = app.callback();
        appServer = app;
        appRequester = supertest.agent(application);
        dataBase = db;
    })

    afterAll(async ()=>
    {
        await dataBase.close();
    })

    test('El repo debe poder crear un usuario /api/sessions/signup',async function(){
        const payload = 
        {
            firstName:"Pablo",
            lastName:"marchetti",
            email:"pabloMarche@prueba.com",
            password: "12345678",
            age:34
        }
        const result = await appRequester.post('/api/sessions/signup').send(payload);
        const {_body,status} = result;
        expect(status).toBe(201);
        expect(_body.data).toHaveProperty('email');
    });

    test('Sign-in /api/sessions/login',async function(){
        const payload = 
        {
            email:"giovannibarolin@gmail.com",
            password: "12345678"
        }
        const result = await appRequester.post('/api/sessions/login').send(payload);
        const {_body,status} = result;
        expect(status).toBe(200);
        expect(_body).toHaveProperty('message')
        expect(_body.message).toBe('Login success')
    })

})

/*
import chai from "chai";
import { initSupertestServer } from "./index.test.js";
/*
import { generateUser } from "../helpers/fakers.js";
import mongoose from "mongoose";
//import supertest from "supertest";
/*
import { config } from "../config/index.js";
import DbFactory from "../data/factories/dbFactory.js";
import UserMongooseRepository from "../data/repository/UserMongooseRepository.js";
import User from "../domain/entities/User.js";
*/
/*
const expect = chai.expect;


describe("Testing User Endpoints",()=>{

    before(function(){
        const {app, db } = initSupertestServer();
        const application = app.callback();
        //const requester = supertest.agent(application);
        this.db = db;
    });
    after(function(){
        this.db.close();
        this.application.close()
    });

    beforeEach(function(){

    });
    
    it("El repository debe ser una instancia de UserMongooseRepository",function(){
       // expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    */
    /*
    it("El repository debe devolver un arreglo",function(){
            const filter = {page:1,limit:5};
            return this.userRepository.Paginate(filter)
            .then(result => {
                expect(Array.isArray(result.docs)).to.be.equals(true);
            });

    });

    it("El limite de paginate debe ser igual al limite proporcionado",function(){
        const filter = {page:1,limit:5};
        return this.userRepository.Paginate(filter)
        .then(result => {
            expect(result.limit).to.be.equals(filter.limit) 
        });
    });

    it("Error: el limite de paginate no corresponde al limite proporcionado",function(){
        const filter = {page:1,limit:6};
        return this.userRepository.Paginate(filter)
        .then(result => {
            expect(result.limit).to.be.not.equals(5) 
        });
    });

    it("El repository debe poder crear un usuario",function(){
        return this.userRepository.create(this.user)
        .then(result => {
            expect(result.firstName).to.be.equals(this.user.firstName);
            expect(result.lastName).to.be.equals(this.user.lastName);
            expect(result.email).to.be.equals(this.user.email);
            expect(result.id instanceof mongoose.Schema.Types.ObjectId);
            this.currentUser = result;
        });
    });

    it("El repository debe devolver un usuario",function(){
        return this.userRepository.findById(this.currentUser.id)
        .then((result)=>{
            expect(result instanceof User).to.be.ok;
            expect(result.id.toString()).to.be.equal(this.currentUser.id.toString());
            expect(result.age).to.be.greaterThan(0);
            expect(result.age).to.be.equal(this.currentUser.age);
        })
    });

    it("El repository debe poder actualizar un usuario",function(){
        // data = { field: value}
        const data={age:34,firstName:"mena"}
        return this.userRepository.update(this.currentUser.id,data)
        .then(result => {
            expect(result.age).to.be.equal(data.age);
            expect(result.firstName).to.be.equal(data.firstName)
        });
    });

    it("El repository debe poder borrar un usuario",function(){
        return this.userRepository.deleteOne(this.currentUser.id)
        .then(result => {
            expect(result.message).to.be.equal("Usuario eliminado!");
            expect(result.deletedCount).to.be.equal(1);
        });
    });
*/
//});
