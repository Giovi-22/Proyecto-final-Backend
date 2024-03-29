import { config } from '../config/index.js';
import AppFactory from '../presentation/factories/AppFactory.js'
import DbFactory from '../data/factories/dbFactory.js';




export const initSupertestServer = async()=>
{
    try{
    const db = DbFactory.create(config.dbType);
    const app = AppFactory.create('express');
    
    await db.init(config.dbUriTests);
    
    app.init();
    app.build();
    
    return {
        db,
        app
    }

    } catch (error) {
        console.log(error.message);
    }

};