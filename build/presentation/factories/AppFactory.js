"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressApp_1 = __importDefault(require("../application/ExpressApp"));
class AppFactory {
    static create(appType = 'express') {
        try {
            const apps = new Map();
            apps.set(appType, ExpressApp_1.default);
            const app = apps.get(appType);
            return new app();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = AppFactory;
