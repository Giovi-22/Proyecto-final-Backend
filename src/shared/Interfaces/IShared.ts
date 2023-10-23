import { PaginateResult } from "mongoose"
import { IUser } from "../../domain/entities/User/IUser"

export interface IPaginationFilters{
    limit?: number,
    page?: number,
    sort?: string,
    filter?: IFilter
} 
export interface IFilter{
    field:string,
    value:string
}

export interface QueryFilter{
    [field:string]:string
}


export interface IPagination extends PaginateResult<IUser>{
    
}
