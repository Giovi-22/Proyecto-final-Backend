import express  from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

import productRouter from '../src/presentation/routes/productRouter.js';
import cartRouter from '../src/presentation/routes/cartRouter.js';

import sessionsRouter from '../src/presentation/routes/sessionsRouter.js';
import userRouter from '../src/presentation/routes/userRouter.js';
import roleRouter from '../src/presentation/routes/roleRouter.js';
import { errorHandler } from '../src/presentation/middlewares/errorHandler.js';


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
    app.use(cors({
        origin: true,
        credentials:true}));
        
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.ECOMMERCEDB_URI,
            ttl:60,
        }),
        secret:'codigoSecreto',
        resave:false,
        saveUninitialized:false
    }));
      
    app.use('/api/products/',productRouter);
    app.use('/api/carts/',cartRouter);
    app.use('/api/sessions',sessionsRouter);
    app.use('/api/users',userRouter)
    app.use('/api/roles',roleRouter);

    app.use(errorHandler);  

    app.listen(port,()=>console.log(`Servidor escuchando en el puerto ${port}`));
    
    } catch (error) {
        console.log(error.message);
    }

    

})();