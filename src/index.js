import express  from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

import sessionsRouter from './routes/sessionsRouter.js';
import userRouter from './routes/userRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';

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
    app.use(cors());
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

    app.use(errorHandler);  

    app.listen(port,()=>console.log(`Servidor escuchando en el puerto ${port}`));
    
    } catch (error) {
        console.log(error.message);
    }

    

})();