import dotenv from 'dotenv';
dotenv.config()

export const config = {
    port: process.env.PORT,
    jwtKey: process.env.JWT_PRIVATE_KEY,
    mongoUri: process.env.ECOMMERCEDB_URI,
    userMongoAtlas: process.env.USERMONGOATLAS,
    passwordMongoAtlas: process.env.PASSWORDMONGOATLAS
}