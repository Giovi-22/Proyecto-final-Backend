import mongoose from "mongoose";

const ticketCollection = "tickets"
const ticketSchema = new mongoose.Schema(
    {
        code: {type:String,required:true, index:true},
        purchase_datetime: {type:String,required:true},
        amount: {type:Number,required:true},
        purchaser: {type:String,required:true, index:true},
    }
);

export const TicketModel = mongoose.model(ticketCollection,ticketSchema);