type Params ={
    id: string,

}
type SearchParams = {
    name: string,
    img: string,
    price: number | null,
    currency: string,
    features: string,
    id: string,
}
export type SearchParamsTypes = {
    params: Params,
    searchParams: SearchParams,
}