import { ConnectionOptions } from "mongodb";
import mongoose, { Connection } from "mongoose";

class MongooseAdapter{

    connection!: mongoose.Mongoose;

    constructor(){}

    async init(uri:string){
        this.connection = await mongoose.connect(uri);
    }

    async close(){
        await this.connection.disconnect();
    }
}

export default MongooseAdapter;