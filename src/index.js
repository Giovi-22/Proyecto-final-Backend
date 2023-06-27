
import { config } from './config/index.js';
import AppFactory from './presentation/factories/AppFactory.js';
import DbFactory from './data/factories/dbFactory.js';




void (async ()=>
{
    try{
    const db = DbFactory.create(config.dbType);
    const expressApp = AppFactory.create('express');
    
    db.init(config.dbUri);

    expressApp.init();
    expressApp.build();
    expressApp.listen();
      

    } catch (error) {
        console.log(error.message);
    }

})();