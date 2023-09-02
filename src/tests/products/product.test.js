import { describe, beforeAll, afterAll, expect } from '@jest/globals'
import supertest from 'supertest';
import { initSupertestServer } from '../index.test';
import _ from 'mongoose-paginate-v2';
import { generateProduct, generateUser } from '../../helpers/fakers';



describe('Testing Products Endpoints',()=>{

    let dataBase;
    let application;
    let appRequester;
    let appServer;
    const admin = {
        email:"administrador@gmail.com",
        password: "12345678"
    }
    let product;
    let premiumProduct;
    let premiumUser = {
        email:"giovannibarolin@gmail.com",
        password:"12345678"
    }
    let JWT;

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
//-----------------SUCCESS TESTS--------------------------------------------------
    test('Loguear administrador /api/sessions/login',async function(){
        const result = await appRequester
            .post('/api/sessions/login')
            .send(admin);
        const {_body,status} = result;
        expect(status).toBe(200);
        JWT = _body.data;
    });

    test('El repo debe poder crear un producto /api/products',async function(){
        product = generateProduct();
        const result = await appRequester
            .post('/api/products')
            .set('Authorization',`Bearer ${JWT}`)
            .send(product);
        const {_body,status} = result;
        expect(status).toBe(201);
        expect(_body.data.code).toBe(product.code);
    });

    test('Loguear premium user /api/sessions/login',async function(){
        const result = await appRequester
            .post('/api/sessions/login')
            .send(premiumUser);
        const {_body,status} = result;
        expect(status).toBe(200);
        JWT = _body.data;
    });

    test('Un user premium puede crear un producto', async()=>{
        premiumProduct = generateProduct();
        const result = await appRequester
        .post('/api/products')
        .set('Authorization',`Bearer ${JWT}`)
        .send(premiumProduct);
        const {_body,status} = result;
        expect(status).toBe(201);
        expect(_body.status).toBe('success');
        expect(_body.data.owner).toBe(premiumUser.email);
        premiumProduct = _body.data;
    })

    test('Un user premium puede borrar un producto', async()=>{
        const result = await appRequester
        .delete(`/api/products/${premiumProduct.id}`)
        .set('Authorization',`Bearer ${JWT}`);
        const {_body,status} = result;
        expect(status).toBe(200);
        expect(_body.status).toBe('success');
        expect(_body.data.owner).toBe(premiumUser.email)
    })
//---------------------FAILED TESTS-----------------------------------------------------------------
});
