import { Request } from "express"
import { IUser } from "../../domain/entities/User/IUser"


declare global{
    namespace Express{
        interface Request{
            user: Partial<IUser>
        }
    }
}

export interface IRequest extends Request{
    user:Partial<IUser>
}