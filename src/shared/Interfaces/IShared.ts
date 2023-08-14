export interface IPaginationFilters{
    limit: number,
    page: number,
    sort: number,
    filter:IFilter
} 
export interface IFilter{
    field:string,
    value:string
}