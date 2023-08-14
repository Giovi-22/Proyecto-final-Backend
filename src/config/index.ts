import dotenv from 'dotenv';
import { IConfig } from './IConfig';
dotenv.config()

export const config:IConfig = {
    appType: process.env.APP_TYPE || "",
    port: process.env.PORT || "",
    jwtKey: process.env.JWT_PRIVATE_KEY || "",
    userMongoAtlas: process.env.USERMONGOATLAS || "",
    passwordMongoAtlas: process.env.PASSWORDMONGOATLAS || "",
    dbUri: process.env.DB_URI || "",
    dbType: process.env.DB_TYPE || "",
    emailKey: process.env.EMAIL_KEY  || ""
}