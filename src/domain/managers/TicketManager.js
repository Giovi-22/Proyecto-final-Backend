import container from "../../container.js";
import { codeIdGenerator } from "../../helpers/nanoidGenerator.js";
import Ticket from "../entities/Ticket.js";
import { idValidation } from "../validations/validators.js";
import CartManager from "./CartManager.js";
import ProductManager from "./ProductManager.js";
class TicketManager{


    constructor(){
        this.ticketRepository = container.resolve("TicketRepository");
        this.cartM = container.resolve('cartManager');
    }

    async create(cid,userEmail){
        await idValidation.parseAsync(cid);
        //const cartM = new CartManager();
        const productM = new ProductManager();
        const cart = await this.cartM.finishPurchase(cid);
        const code = await codeIdGenerator();
        let amount = 0;

        if(!cart.availableProducts.length){
            throw new Error("There are no products available to buy",{cause: "Bad Request"});
        }

        cart.availableProducts.forEach(product => {
            amount += product.quantity * product.product.price;
        })

        const newTicket = new Ticket({
            code: code,
            amount: amount,
            purchaser: userEmail,
            products: cart.availableProducts.map(element =>({pid: element.product.id,quantity: element.quantity}))
        })

        for await (const element of cart.availableProducts){
            const updatedStock = (element.product.stock - element.quantity) >= 0 ? (element.product.stock - element.quantity) : 0;
            await productM.update(element.product.id,{stock: updatedStock});
        }

        if(cart.unavailableProducs.length){
        this.cartM.updateAll(cid,cart.unavailableProducs.map(element =>({pid:element.product.id,quantity:element.quantity})));
        }else{
            await this.cartM.deleteAll(cid);
        }

        return this.ticketRepository.create(newTicket);

    }

    async convertProductData(ticket){
        const products = ticket.products.map(item=>({
            title:item.pid.title,
            price: item.pid.price,
            quantity: item.quantity,
            total: (item.pid.price * item.quantity)
        }))
    return products;
    } 

    async getOne(tid){
        return this.ticketRepository.findById(tid);
    }
}

export default TicketManager;