import container from '../../container.js';


class BlackListManager {

    #blackListRepository;

    constructor(){
        this.#blackListRepository = container.resolve('blackListRepository');
    }

    async add(token){
        return this.#blackListRepository.add(token);
    }

    async isOnBlackList(token){
        const result =  await this.#blackListRepository.getOne(token);
        if(result){
            const isOnList = result.tokens.find(tk => tk === token)
            if(!isOnList){
                return false
            }
            return true
        }
        return false;
    }
}

export default BlackListManager;