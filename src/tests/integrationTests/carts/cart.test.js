import { describe, beforeAll, afterAll, expect } from '@jest/globals'
import supertest from 'supertest';

import { initSupertestServer } from '../../index.test';

describe('Testing Cart Endpoints',()=>{

    let dataBase;
    let appRequester;

    const admin = {
        email:"administrador@gmail.com",
        password: "12345678"
    }
    let JWT;

    beforeAll(async ()=>
    {
        const {app, db } = await initSupertestServer();
        const application = app.callback();
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

    test('El repo debe poder crear carrito /api/carts',async function(){
        const result = await appRequester
            .post('/api/carts')
            .set('Authorization',`Bearer ${JWT}`);
        const {_body,status} = result;
        expect(status).toBe(201);
        expect(_body.data.products).toBeInstanceOf(Array);
        expect(_body.data.id).toHaveLength(24);
    });

    test('El repo debe devolver todos los carritos /api/carts',async function(){
        const result = await appRequester
            .get('/api/carts/')
            .set('Authorization',`Bearer ${JWT}`);
        const {_body,status} = result;
        expect(status).toBe(200);
        expect(_body.data).toBeInstanceOf(Array);
        if(_body.data.length){
            expect(_body.data[0]).toHaveProperty('id')
        }
    });

    test('El repo debe devolver un carrito /api/carts/:cid', async()=>{
            const cid = '64f47e2d41a26ae7cce831ed';
            const result = await appRequester
                .get(`/api/carts/${cid}`)
                .set('Authorization',`Bearer ${JWT}`);
            const {_body,status} = result;
            expect(status).toBe(200);
            expect(_body.data).toBeInstanceOf(Object);
            expect(_body.data).toHaveProperty('products');
            if(_body.data.products.length){
                expect(_body.data.products[0].product).toHaveProperty('id')
            }
    });
    test('El repo debe actualizar un carrito /api/carts/:cid', async()=>{
        const data = [
            {
                pid: "6451a60aaaa91a4391bedfb7",
                quantity:2
            }
        ];
        const cid = '64f47dc541a26ae7cce831e7';
        const result = await appRequester
            .put(`/api/carts/${cid}`)
            .set('Authorization',`Bearer ${JWT}`)
            .send(data);
        const {_body,status} = result;
        expect(status).toBe(200);
        expect(_body.data).toBeInstanceOf(Object);
        expect(_body.data).toHaveProperty('products');
        if(_body.data.products.length){
            const prod = _body.data.products[0].pid.toString();
            expect(prod).toEqual(data[0].pid);
            return;
        }
    })

    test('El repo debe borrar un producto del carrito /api/carts/:cid/products/:pid', async()=>{
        const cid = '64f47dc541a26ae7cce831e7';
        const pid = '6451a60aaaa91a4391bedfb7'
        const result = await appRequester
            .delete(`/api/carts/${cid}/products/${pid}`)
            .set('Authorization',`Bearer ${JWT}`);
        const {_body,status} = result;
        expect(status).toBe(200);
        expect(_body.data).toBeInstanceOf(Object);
        expect(_body.data).toHaveProperty('products');
    })
});
