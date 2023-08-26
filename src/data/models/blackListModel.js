import mongoose from "mongoose";

const blackListCollection = 'blackList';

const blackListSchema = new mongoose.Schema({
    jwtTokens:[{type:String,required:true}],
})

export const blackListModel = mongoose.model(blackListCollection,blackListSchema);