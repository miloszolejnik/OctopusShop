const formatPrice = (amount:number) =>{
    return new Intl.NumberFormat('PL',{
        style: 'currency',
        currency: 'PLN',
    }).format(amount / 100)
}

export default formatPrice