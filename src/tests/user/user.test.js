import { describe, beforeAll, afterAll, expect } from '@jest/globals'
import supertest from 'supertest';
import { initSupertestServer } from '../index.test';
import _ from 'mongoose-paginate-v2';
import { generateUser } from '../../helpers/fakers';
import { faker } from '@faker-js/faker';



describe('Testing User Endpoints',()=>{

    let dataBase;
    let application;
    let appRequester;
    let appServer;
    let user;
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
        await dataBase.close();
    })
//-----------------SUCCESS TESTS--------------------------------------------------
    test('Loguear administrador /api/sessions/login',async function(){
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

    test('El repo debe poder crear un usuario /api/users/',async function(){
        user = generateUser();
        user.role= "64e008358c92e83aae4b8228"; //role premium
        const result = await appRequester
            .post('/api/users/')
            .set('Authorization',`Bearer ${JWT}`)
            .send(user);
        const {_body,status} = result;
        expect(status).toBe(201);
        expect(_body.data).toHaveProperty('email');
    });

    test('El repo debe poder loguear un usuario /api/sessions/login',async function(){
        const result = await appRequester
            .post('/api/sessions/login')
            .send(
                {
                    email: user.email,
                    password: user.password
                }
            );
        const {_body,status} = result;
        expect(status).toBe(200);
        expect(_body).toHaveProperty('message');
        expect(_body.message).toBe('Login success');
        JWT = _body.data;
    });

    test('Un user premium puede crear un producto', async()=>{
        console.log("el usuario logueado es: ",user)
        const newProduct = {
            title: "Cortante tortuga ninja5",
            description: "Incluye dos unidades,cortante y marcador. Tamaño 8cm",
            price: 630,
            thumbnail: [],
            code: `CB${faker.number.int({min:1,max:500})}`,
            stock: 15,
            status: true,
            category:"cortantes",
            owner:user.email
          }
        const result = await appRequester
        .post('/api/products')
        .set('Authorization',`Bearer ${JWT}`)
        .send(newProduct);
        const {_body,status} = result;
        expect(status).toBe(201);
        expect(_body.status).toBe('success');
        expect(_body.data.owner).toBe(user.email)
    })


//---------------------FAILED TESTS-----------------------------------------------------------------
});
