import dotenv from 'dotenv';
dotenv.config()

export const config = {
    appType: process.env.APP_TYPE,
    port: process.env.PORT,
    jwtKey: process.env.JWT_PRIVATE_KEY,
    userMongoAtlas: process.env.USERMONGOATLAS,
    passwordMongoAtlas: process.env.PASSWORDMONGOATLAS,
    dbUri: process.env.DB_URI,
    dbType: process.env.DB_TYPE,
    emailKey: process.env.MAIL_KEY
}