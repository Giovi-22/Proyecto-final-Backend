import MongooseAdapter from "./mongooseAdapter";

class DbFactory{

    static create(dbType='mongo'){
        const dbs = new Map();
        dbs.set('mongo', MongooseAdapter);

        const db = dbs.get(dbType);
        return new db;
    }
}

export default DbFactory;