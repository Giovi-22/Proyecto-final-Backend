import express  from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import pRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

import { clientErrorHandler } from './middlewares/clientErrorHandler.js';
import { serverErrorHandler } from './middlewares/serverErrorHandler.js';

dotenv.config();
const port = process.env.PORT;


void (async ()=>
{
    try{
        
    
    await mongoose.connect(process.env.ECOMMERCEDB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.ECOMMERCEDB_URI,
            ttl:60
        }),
        secret:'codigoSecreto',
        resave:false,
        saveUninitialized:false
    }));
      
    app.use('/api/products/',pRouter);
    app.use('/api/carts/',cartRouter);
    app.use('/api/sessions',sessionsRouter);
    app.use('/api/users',userRouter)

    app.use(clientErrorHandler);  
    app.use(serverErrorHandler);

    app.listen(port,()=>console.log(`Servidor escuchando en el puerto ${port}`));
    } catch (error) {
        console.log(error.message);
    }

    

})();