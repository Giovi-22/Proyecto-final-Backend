"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseAdapter_1 = __importDefault(require("./mongooseAdapter"));
class DbFactory {
    static create(dbType = 'mongo') {
        const dbs = new Map();
        dbs.set('mongo', mongooseAdapter_1.default);
        const db = dbs.get(dbType);
        return new db;
    }
}
exports.default = DbFactory;
