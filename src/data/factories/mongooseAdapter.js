import mongoose from "mongoose";

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
            return await this.connection.disconnect();
    }
}

export default MongooseAdapter;