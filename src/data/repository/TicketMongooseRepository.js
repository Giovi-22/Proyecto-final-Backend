import Ticket from "../../domain/entities/Ticket.js";
import { TicketModel } from "../models/ticketModel.js";


class TicketMongooseRepository{

    async create(ticket)
    {
        const newTicket= await TicketModel.create(ticket);
        return new Ticket({
            id: newTicket._id,
            code: newTicket.code,
            purchase_datetime: newTicket.purchase_datetime,
            amount: newTicket.amount,
            purchaser: newTicket.purchaser
        })  
    }

    async findById(tid)
    {
        const ticket = await TicketModel.findById(tid);
        return new Ticket({
            id: ticket._id,
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchaser: ticket.purchaser 
        })
    }
    /*
    async findByFilter(filter)
    {
        const products = await productModel.find(filter);
        return products.map(product => new Product(product));     
    }

    async Paginate({limit,page,sort,filter})
    {
        const options = {
            limit: limit,
            page: page,
            sort:{'price':sort,'_id':1}, //condicion requerida en la entrega
        }
        //Model.paginate([query],[options],[callback])
        const result = await productModel.paginate(filter,options);
        Object.assign(result,
            {docs: result.docs.map(product => new Product({
                id: product._id.toString(),
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                thumbnail: product.thumbnail,
                code: product.code,
                status: product.status
            })),
            
        });
        return result;
    }
    
    async findById(pid)
    {
        const product = await productModel.findById(pid);
        return {
            id: (product._id).toString(),
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            thumbnail: product.thumbnail,
            stock: product.stock,
            code: product.code,
            status: product.status   
        }
    }

    async update(pid,data)
    {
        const productUpdated = await productModel.findOneAndUpdate({_id:pid},data,{new:true});
        return {
                id: productUpdated._id,
                title: productUpdated.title,
                description: productUpdated.description,
                price: productUpdated.price,
                thumbnail: productUpdated.thumbnail,
                stock: productUpdated.stock,
                code: productUpdated.code,
                status: productUpdated.status,
                category: productUpdated.category
        }
    }
    */
}

export default TicketMongooseRepository;