import { exit } from 'shelljs'; 
import { program } from 'commander';

import DbFactory from './data/factories/dbFactory.js';
import { config } from './config/index.js';
import AddUser from './presentation/commands/AddUser.js';
import setAdmin from './presentation/commands/setAdmin.js';

void (async ()=>
{
    try 
    {
        const db = DbFactory.create();
        db.init(config.dbUri);

        program.addCommand(AddUser);
        program.addCommand(setAdmin);
        
        await program.parseAsync(process.argv);

        exit();
    } 
    catch (error) 
    {
        exit();
    }
}
)();