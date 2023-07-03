import container from "../../container.js";
import Ticket from "../entities/Ticket.js";
import { idValidation } from "../validations/validators.js";
import CartManager from "./CartManager.js";
class TicketManager{


    constructor(){
        this.ticketRepository = container.resolve("TicketRepository");
    }

    async create(cid){
        await idValidation.parseAsync(cid);
        const cartM = new CartManager();
        const cart = await cartM.finishPurchase(cid);
        let amount = 0;
        cart.availableProducts.forEach(product => {
            amount += product.quantity * product.product.price;
        })
        const newTicket = new Ticket({
            code: "code",
            purchase_datetime: "new Date()",
            amount: amount,
            purchaser: "",
            products: cart.availableProducts.map(element => ({pid: element.product.id,quantity: element.quantity}))
        })
        return await this.ticketRepository.create(newTicket);
    }
}

export default TicketManager;