import cron from 'node-cron';
import { config } from './config/index.js';
import AppFactory from './presentation/factories/AppFactory.js';
import DbFactory from './data/factories/dbFactory.js';
import UserManager from './domain/managers/UserManager.js';




void (async ()=>
{
    try{
    const db = DbFactory.create(config.dbType);
    const app = AppFactory.create('express');
    
    db.init(config.dbUri);

    app.init();
    app.build();
    app.listen();

    const userM = new UserManager();
    
    const cronTask = cron.schedule('0 0 */2 * * *', async function()
    {
        const deletedUsers = await userM.inactiveUsers();
        console.log("Los usuarios borrados son: ",deletedUsers);

    },{scheduled:false});

    cronTask.start();

    } catch (error) {
        console.log(error.message);
    }

})();