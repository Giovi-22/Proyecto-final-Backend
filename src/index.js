import mongoose from 'mongoose';


import { config } from './config/index.js';
import AppFactory from './presentation/factories/AppFactory.js';




void (async ()=>
{
    try{
    await mongoose.connect(config.mongoUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    const expressApp = AppFactory.create(config.appType);
    
    expressApp.init();
    expressApp.build();
    expressApp.listen();
      

    } catch (error) {
        console.log(error.message);
    }

})();