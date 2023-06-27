import dotenv from 'dotenv';
dotenv.config()

export const config = {
    port: process.env.PORT,
    jwtKey: process.env.JWT_PRIVATE_KEY,
    userMongoAtlas: process.env.USERMONGOATLAS,
    passwordMongoAtlas: process.env.PASSWORDMONGOATLAS,
    dbUri: "mongodb+srv://giovibarolin:giovibarolin@codercluster.orn15dr.mongodb.net/ecommerce?retryWrites=true&w=majority",
    dbType: process.env.DB_TYPE
}