import container from "../../container.js";
import { codeIdGenerator } from "../../helpers/nanoidGenerator.js";
import Ticket from "../entities/Ticket.js";
import { idValidation } from "../validations/validators.js";
import CartManager from "./CartManager.js";
class TicketManager{


    constructor(){
        this.ticketRepository = container.resolve("TicketRepository");
    }

    async create(cid,userEmail){
        await idValidation.parseAsync(cid);
        const cartM = new CartManager();
        const cart = await cartM.finishPurchase(cid);
        let amount = 0;
        const code = codeIdGenerator();
        cart.availableProducts.forEach(product => {
            amount += product.quantity * product.product.price;
        })
        const newTicket = new Ticket({
            code: code,
            amount: amount,
            purchaser: userEmail,
            products: cart.availableProducts.map(element => ({pid: element.product.id,quantity: element.quantity}))
        })
        return await this.ticketRepository.create(newTicket);
    }
}

export default TicketManager;