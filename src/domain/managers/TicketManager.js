import container from "../../container";
import Ticket from "../entities/Ticket";

class TicketManager{


    constructor(){
        this.ticketRepository = container.resolve("TicketRepository");
    }

    async create(purchase){
        const newTicket = await this.ticketRepository.create(purchase);
        
        
    }
}

export default TicketManager;