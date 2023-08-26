import { blackListModel } from "../models/blackListModel.js";

class BlackListMongooseRepository{

    async add(token){

        const isBlackList = await blackListModel.find();
        if(!isBlackList.length)
        {
            return blackListModel.create({jwtTokens: token});
        }
        const tokens = [...isBlackList[0].jwtTokens];
        tokens.push(token)
        return blackListModel.findOneAndUpdate(isBlackList._id,{jwtTokens:tokens},{new:true});
    }

    async getOne(token){
        const result = await blackListModel.findOne({jwtTokens:token});
        if(!result)
        {
            return null;
        }
        return{
            id: result._id,
            tokens: result.jwtTokens
        };
    }
}

export default BlackListMongooseRepository;