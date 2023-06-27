import mongoose from "mongoose";
import { config } from "../../config/index.js";

class MongooseAdapter{

    constructor(){
        this.connection = null;
    }

    async init(uri){
        this.connection = await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
    }

    async close(){
        await this.connection.disconnect();
    }
}

export default MongooseAdapter;