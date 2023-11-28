export type ProductType = {
    name: string,
    img: string,
    price: number | null,
    id: string,
    currency: string,
    quantity?: number | 1,
    metadata: MetadataType
}
type MetadataType = {
    features: string
}