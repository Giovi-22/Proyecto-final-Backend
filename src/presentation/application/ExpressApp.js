import express  from 'express';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { engine } from 'express-handlebars';
import cors from 'cors';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { SwaggerTheme } from 'swagger-themes';

import { config } from '../../config/index.js';
import productRouter from '../routes/productRouter.js';
import cartRouter from '../routes/cartRouter.js';
import ticketRouter from '../routes/ticketRouter.js';
import sessionsRouter from '../routes/sessionsRouter.js';
import userRouter from '../routes/userRouter.js';
import roleRouter from '../routes/roleRouter.js';
import { errorHandler } from '../middlewares/errorHandler.js';







class ExpressApp{
    
    #viewPath = path.resolve('src/presentation/views');
    #server;
    constructor(){
       this.app = express();
       this.swaggerOptions = {
        definition:{
            openapi:'3.0.1',
            info:{
                title:'Coder e-commerce API documentation',
                description: "This is the API documentation for our e-commerce platform. You'll find all the essential information required to utilize each API endpoint"
            }
        },
        apis:[`${path.resolve('docs/**/*.yaml')}`]
       }
    }
    

    init(){
        const theme = new SwaggerTheme('v3') 
        const options = {
            customCss: theme.getBuffer('dark'),
        }
        const specs = swaggerJSDoc(this.swaggerOptions);
        this.app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs,options));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.resolve('src/public')))
        this.app.engine('handlebars',engine({
            defaultLayout:`${this.#viewPath}/layouts/main.handlebars`,
            layoutsDir:`${this.#viewPath}`
        }))
        this.app.set('view engine','handlebars');
        this.app.set('views',this.#viewPath);

        this.app.use(cors({
            origin: true,
            credentials:true}));
        
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: config.dbUri,
                ttl:60,
            }),
            secret:'codigoSecreto',
            resave:false,
            saveUninitialized:false
        }));
    }

    callback()
    {
        return this.app;
    }

    async close()
    {
        await this.#server.close(()=>console.log('The app has been closed'))
    }

    build(){
        this.app.use('/api/products/',productRouter);
        this.app.use('/api/carts/',cartRouter);
        this.app.use('/api/tickets',ticketRouter);
        this.app.use('/api/sessions',sessionsRouter);
        this.app.use('/api/users',userRouter)
        this.app.use('/api/roles',roleRouter);
        this.app.get('/api/close-server',async (req,res)=>{
            const result = await this.close();
            return result;
        })
        this.app.use(errorHandler);
    }

    listen(){
        this.#server = this.app.listen(config.port,()=>console.log(`Servidor escuchando en el puerto ${config.port}`));
    }

}

export default ExpressApp;
