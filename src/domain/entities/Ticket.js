
class Ticket{
    #id;
    #code;
    #purchase_datetime;
    #amount;
    #purchaser;

    constructor(props){
    this.#id = props.id;
    this.#code = props.code;
    this.#purchase_datetime = props.purchase_datetime;
    this.#amount = props.amount;
    this.#purchaser = props.purchaser;
    }
}

export default Ticket;