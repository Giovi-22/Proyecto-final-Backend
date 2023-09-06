import { Command } from 'commander';
import UserManager from '../../domain/managers/UserManager.js';

const setAdmin = new Command('setAdmin');

setAdmin
    .version('0.0.1')
    .description("Change the user's isAdmin property to true")
    .option('-e, --email <email>',"User's email")
    .action(async(env)=>
    {
        const email = env.email

        const userM = new UserManager();
        const user = await userM.findByFilter({field:'email',value:email})
        const updatedUser = await userM.updateOne(user.id.toString(),{isAdmin:true});
        if(updatedUser)
        {
            console.log('User updated successfully');
        }
    });

    export default setAdmin;