import Ticket from "../entities/Ticket";

class TicketManager{


    constructor(){
        this.Ticket = new Ticket();
    }

    async generate(purchase){
        this.Ticket.code = purchase.code;
        this.Ticket.
    }
}

export default TicketManager;