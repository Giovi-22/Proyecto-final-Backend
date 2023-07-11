import chai from "chai";

import { config } from "../config/index.js";
import DbFactory from "../data/factories/dbFactory.js";
import UserMongooseRepository from "../data/repository/UserMongooseRepository.js";
import User from "../domain/entities/User.js";
import { generateUser } from "../helpers/fakers.js";

const expect = chai.expect;

const db = DbFactory.create(config.dbType);


describe("Testing user Mongoose Repository",()=>{
    before(function(){
        db.init(config.dbUri)
        this.userRepository = new UserMongooseRepository();
        this.user = new User(generateUser());
        this.currentUser = {};
    });
    after(function(){
        db.close();
    });

    beforeEach(function(){

    });
    it("El repository debe ser una instancia de UserMongooseRepository",function(){
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it("El repository debe devolver un arreglo",function(){
            const filter = {page:1,limit:5};
            return this.userRepository.Paginate(filter)
            .then(result => {
                expect(Array.isArray(result.docs)).to.be.equals(true);
            });

    });

    it("El limite de paginate debe ser igual al limite proporcionado",function(){
        const filter = {page:1,limit:5};
        return this.userRepository.Paginate(filter)
        .then(result => {
            expect(result.limit).to.be.equals(filter.limit) 
        });
    });

    it("Error: el limite de paginate no corresponde al limite proporcionado",function(){
        const filter = {page:1,limit:6};
        return this.userRepository.Paginate(filter)
        .then(result => {
            expect(result.limit).to.be.not.equals(5) 
        });
    });

    it("El repository debe poder crear un usuario",function(){
        return this.userRepository.create(this.user)
        .then(result => {
            expect(result.firstName).to.be.equals(this.user.firstName);
            expect(result.lastName).to.be.equals(this.user.lastName);
            expect(result.email).to.be.equals(this.user.email);
            this.currentUser = result;
        });
    });

    it("El repository debe poder borrar un usuario",function(){
        console.log("Usuario actual: ",this.currentUser);
        return this.userRepository.deleteOne(this.currentUser.id)
        .then(result => {
            expect(result.message).to.be.equal("Usuario eliminado!");
            expect(result.deletedCount).to.be.equal(1);
        });
    });

});