import { blackListModel } from "../models/blackListModel.js";

class BlackListMongooseRepository{

    async add(token){
        console.log("el token es: ",token)
        const isBlackList = await blackListModel.find();
        console.log("la blacklist es: ",isBlackList)
        if(!isBlackList.length){
            const result = await blackListModel.create({jwtTokens: token});
            console.log("No existe la collection. los resultados :",result)
        }
        const tokens = [...isBlackList[0].jwtTokens];
        tokens.push(token)
        const result = await blackListModel.findOneAndUpdate(isBlackList._id,{jwtTokens:tokens},{new:true});
        console.log("los resultados :",result)
    }
}

export default BlackListMongooseRepository;