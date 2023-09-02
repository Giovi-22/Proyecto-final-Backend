import { describe, beforeAll, afterAll, expect } from '@jest/globals'

import supertest from 'supertest';

import { initSupertestServer } from '../../index.test';


let JWT;


describe('Testing Role Endpoints',()=>{

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
        await appRequester.app.close(()=>
        {
            console.log("The server has been closed");
        });
       return await dataBase.close();
    })

    test('Loguear usuario /api/sessions/login',async function(){
        const result = await appRequester
            .post('/api/sessions/login')
            .send(
                {
                    email: "administrador@gmail.com",
                    password: "12345678"
                }
            );
        const {_body,status} = result;
        expect(status).toBe(200);
        JWT = _body.data;
    });

    test('El repo debe poder crear un role /api/roles',async function(){
        
        const newRole=
            {
                name:"premium",
                permissions:
                [
                    "addProduct",
                    "updateProduct",
                    "deleteProduct",
                ]
            }
        const result = await appRequester
            .post('/api/roles')
            .set('Authorization',`Bearer ${JWT}`)
            .send(newRole);
        const {_body,status} = result;
        expect(status).toBe(201);
        expect(_body.data.name).toBe(newRole.name);
    });

});
