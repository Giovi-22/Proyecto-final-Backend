import { Request } from "express"

import { IRole } from "../../domain/entities/Role/IRole";


declare global{
    namespace Express{
        interface Request{
            user:{
                id:string,
                email: string,
                role: IRole | null,
                isAdmin: boolean
            }
        }
    }
}

export interface IRequest extends Request{
    user:{
        id:string,
        email: string,
        role: IRole | null,
        isAdmin: boolean
    }
}

