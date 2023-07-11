import chai from "chai";
import mongoose from "mongoose";

import { config } from "../config/index.js";
import DbFactory from "../data/factories/dbFactory.js";
import RoleRepository from "../data/repository/RoleRepository.js";
import Role from "../domain/entities/Role.js";


const expect = chai.expect;

const db = DbFactory.create(config.dbType);


describe("Testing role Mongoose Repository",()=>{
    before(function(){
        db.init(config.dbUri)
        this.rolRepository = new RoleRepository();
        this.currentRole = {};
    });

    it("El repository debe ser una instancia de RoleRepository",function(){
        expect(this.rolRepository instanceof RoleRepository).to.be.ok;
    });

    it("El repository debe poder crear un role",function(){
        const data = {name:"Admin", permissions:[]}
        return this.rolRepository.create(data)
        .then(result => {
            expect(result instanceof Role);
            expect(result.id instanceof mongoose.Schema.Types.ObjectId);
            expect(result.name).to.be.equals(data.name);
            expect(result).to.have.property("permissions");
            this.currentRole = result;
        });
    });

    it("El repository debe poder devolver un role",function(){
        return this.rolRepository.getOne(this.currentRole.id)
        .then(result => {
            expect(result instanceof Role);
            expect(result.id instanceof mongoose.Schema.Types.ObjectId);
            expect(result.id.toString()).to.be.equal(this.currentRole.id.toString());
            expect(result.name).to.be.equals(this.currentRole.name);
            expect(result).to.have.property("permissions");
        });
    });

    it("El repository debe poder actualizar los permisos",function(){
        const permissions=["getCart"];
        return this.rolRepository.updatePermission(this.currentRole.id,permissions)
        .then((result)=>{
            expect(result instanceof Role);
            expect(result.id instanceof mongoose.Schema.Types.ObjectId);
            expect(result.id.toString()).to.be.equal(this.currentRole.id.toString());
            expect(result.permissions.length).to.be.ok;
            expect(result.permissions).to.have.members(permissions);
        })
    })
    /*
    it("El repository debe devolver un arreglo",function(){
            const filter = {page:1,limit:5};
            return this.rolRepository.Paginate(filter)
            .then(result => {
                expect(Array.isArray(result.docs)).to.be.equals(true);
            });

    });

    it("El limite de paginate debe ser igual al limite proporcionado",function(){
        const filter = {page:1,limit:5};
        return this.rolRepository.Paginate(filter)
        .then(result => {
            expect(result.limit).to.be.equals(filter.limit) 
        });
    });

    it("Error: el limite de paginate no corresponde al limite proporcionado",function(){
        const filter = {page:1,limit:6};
        return this.rolRepository.Paginate(filter)
        .then(result => {
            expect(result.limit).to.be.not.equals(5) 
        });
    });

    it("El repository debe poder crear un usuario",function(){
        return this.rolRepository.create(this.user)
        .then(result => {
            expect(result.firstName).to.be.equals(this.user.firstName);
            expect(result.lastName).to.be.equals(this.user.lastName);
            expect(result.email).to.be.equals(this.user.email);
            expect(result.id instanceof mongoose.Schema.Types.ObjectId);
            this.currentUser = result;
        });
    });

    it("El repository debe devolver un usuario",function(){
        return this.rolRepository.findById(this.currentUser.id)
        .then((result)=>{
            console.log("El resultado es: ",result)
            expect(result instanceof User).to.be.ok;
            expect(result.id.toString()).to.be.equal(this.currentUser.id.toString());
            expect(result.age).to.be.greaterThan(0);
            expect(result.age).to.be.equal(this.currentUser.age);
        })
    });

    it("El repository debe poder actualizar un usuario",function(){
        // data = { field: value}
        const data={age:34,firstName:"mena"}
        return this.rolRepository.update(this.currentUser.id,data)
        .then(result => {
            expect(result.age).to.be.equal(data.age);
            expect(result.firstName).to.be.equal(data.firstName)
        });
    });

    it("El repository debe poder borrar un usuario",function(){
        return this.rolRepository.deleteOne(this.currentUser.id)
        .then(result => {
            expect(result.message).to.be.equal("Usuario eliminado!");
            expect(result.deletedCount).to.be.equal(1);
        });
    });
*/
});