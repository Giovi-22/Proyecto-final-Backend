import container from "../../container.js";
import { codeIdGenerator } from "../../helpers/nanoidGenerator.js";
import Ticket from "../entities/Ticket.js";
import { idValidation } from "../validations/validators.js";
import CartManager from "./CartManager.js";
import ProductManager from "./ProductManager.js";
class TicketManager{


    constructor(){
        this.ticketRepository = container.resolve("TicketRepository");
    }

    async create(cid,userEmail){
        await idValidation.parseAsync(cid);
        const cartM = new CartManager();
        const productM = new ProductManager();
        const cart = await cartM.finishPurchase(cid);
        const code = await codeIdGenerator();
        let amount = 0;

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
        cartM.updateAll(cid,cart.unavailableProducs.map(element =>({pid:element.product.id,quantity:element.quantity})));
        }else{
            await cartM.deleteAll(cid);
        }
        return this.ticketRepository.create(newTicket);

    }

    async getOne(tid){
        return this.ticketRepository.findById(tid);
    }
}

export default TicketManager;