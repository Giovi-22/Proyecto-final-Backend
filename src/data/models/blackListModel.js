import mongoose from "mongoose";

const blackListCollection = 'blackList';
const blackListSchema = new mongoose.Schema({
    jwtTokens:{type:Array}
})

export const blackListModel = mongoose.model(blackListCollection,blackListSchema);