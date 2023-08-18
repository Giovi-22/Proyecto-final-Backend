import { describe, beforeAll, afterAll, expect } from '@jest/globals'
import supertest from 'supertest';
import { initSupertestServer } from './index.test';
import _ from 'mongoose-paginate-v2';
import { generateUser } from '../helpers/fakers';

let user;
let JWT;


describe('Testing Session Endpoints',()=>{

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
        user = generateUser();
        const result = await appRequester.post('/api/sessions/signup').send(user);
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

    test('Current api/sessions/current',async function(){
        const result = await appRequester.get('/api/sessions/current').set('Authorization',`Bearer ${JWT}`);
        const{_body,status} = result;
        expect(status).toBe(200);
        expect(_body.data).toHaveProperty('email')
        expect(_body.data.email).toBe(user.email)

    })

    test('No se puede loguear un usuario incorrecto /api/sessions/login',async function(){
        const result = await appRequester
            .post('/api/sessions/login')
            .send(
                {
                    email:"email incorrecto",
                    password:"password incorrecto"
                }
                );
        const {_body,status} = result;
        expect(status).toBe(400);
        expect(_body).toHaveProperty('message');
        expect(_body.status).toBe('error');
    });
    
    test('El email es incorrecto /api/sessions/login',async function(){
        const result = await appRequester
            .post('/api/sessions/login')
            .send(
                {
                    email:"email incorrecto",
                    password:"12345678"
                }
                );
        const {_body,status} = result;
        expect(status).toBe(400);
        expect(_body.status).toBe('error');
    });
});
