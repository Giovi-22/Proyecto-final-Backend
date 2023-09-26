"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    appType: process.env.APP_TYPE || "",
    port: process.env.PORT || "",
    jwtKey: process.env.JWT_PRIVATE_KEY || "",
    userMongoAtlas: process.env.USERMONGOATLAS || "",
    passwordMongoAtlas: process.env.PASSWORDMONGOATLAS || "",
    dbUri: process.env.DB_URI || "",
    dbType: process.env.DB_TYPE || "",
    emailKey: process.env.EMAIL_KEY || ""
};
