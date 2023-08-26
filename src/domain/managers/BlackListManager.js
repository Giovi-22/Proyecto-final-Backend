import container from "../../container.js";


class BlackListManager {

    #blackListRepository;

    constructor(){
        this.#blackListRepository = container.resolve('blackListRepository');
    }

    async add(token){
        const result = await this.#blackListRepository.add(token);
    }
}

export default BlackListManager;