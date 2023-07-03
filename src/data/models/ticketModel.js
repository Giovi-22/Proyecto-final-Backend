import mongoose from "mongoose";

const ticketCollection = "tickets"
const ticketSchema = new mongoose.Schema(
    {
        code: {type:String,required:true, index:true},
        amount: {type:Number,required:true},
        purchaser: {type:String,required:true, index:true},
        products: {
            type:[
                {
                    pid:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'products'      //coleccion a la que hace referencia el campo pid
                    },
                    quantity: Number
            }
        ],
        default:[]
        },
    },
    {
        timestamps:{
            createdAt: 'purchase_datetime'
        }
    }
);

export const TicketModel = mongoose.model(ticketCollection,ticketSchema);