import express  from 'express';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

import { config } from '../../config/index.js';
import productRouter from '../routes/productRouter.js';
import cartRouter from '../routes/cartRouter.js';
import sessionsRouter from '../routes/sessionsRouter.js';
import userRouter from '../routes/userRouter.js';
import roleRouter from '../routes/roleRouter.js';
import { errorHandler } from '../middlewares/errorHandler.js';




class ExpressApp{
    
    constructor(){
       this.app = express();
    }
    

    init(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: true,
            credentials:true}));
        
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: config.mongoUri,
                ttl:60,
            }),
            secret:'codigoSecreto',
            resave:false,
            saveUninitialized:false
        }));
    }

    build(){
        this.app.use('/api/products/',productRouter);
        this.app.use('/api/carts/',cartRouter);
        this.app.use('/api/sessions',sessionsRouter);
        this.app.use('/api/users',userRouter)
        this.app.use('/api/roles',roleRouter);
        this.app.use(errorHandler);
    }

    listen(){
        this.app.listen(config.port,()=>console.log(`Servidor escuchando en el puerto ${config.port}`));
    }

}

export default ExpressApp;
