import { Command } from "commander";
import UserManager from "../../domain/managers/UserManager.js";

const AddUser = new Command('addUser');

AddUser
    .version('0.0.1')
    .description('Create user')
    .option('-e, --email <email>',"User's email")
    .option('-fn, --firstName <firstName>',"User's first name")
    .option('-ln, --lastName <lastName>',"User's last name")
    .option('-p, --password <password>',"User's password")
    .option('-a, --age <age>',"User's age")
    .option('-ia, --isAdmin',"User's isAdmin ",false)
    .action(async(env)=>
    {
        const payload = {
            ...env,
            age: +env.age,
        };
        console.log(payload)
        const userM = new UserManager();
        const user = await userM.create(payload);

        if(user)
        {
            console.log('User created successfully');
        }
    });

    export default AddUser;