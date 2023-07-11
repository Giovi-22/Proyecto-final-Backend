import Assert  from "assert";
import chai from "chai";

import { config } from "../config/index.js";
import DbFactory from "../data/factories/dbFactory.js";
import UserMongooseRepository from "../data/repository/UserMongooseRepository.js";

const expect = chai.expect;

const db = DbFactory.create(config.dbType);


describe("Testing user Mongoose Repository",()=>{
    before(function(){
        db.init(config.dbUri)
        this.userRepository = new UserMongooseRepository();
    });

    beforeEach(function(){

    });
    it("El repository debe ser una instancia de UserMongooseRepository",function(){
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it("El repository debe devolver un arreglo",function(){
            return this.userRepository.Paginate({page:1,limit:5})
            .then(result => assert.strictEqual(Array.isArray(result.docs),true));

    })
})