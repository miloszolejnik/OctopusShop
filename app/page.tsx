import Stripe from "stripe"
import Product from './components/product';

const getProducts = async () =>{
  const stripe = new Stripe('sk_test_51MyZW2GW0xDNkRsqxUMfK1kf5L2yPI5ofO0fobctvY2TCPmoOszrQ1saJqcrY7rcLMNt1AMe47oCvdbVYRXcpcV100upziRbk1' as string, {
    apiVersion: '2022-11-15',
  })
  const products = await stripe.products.list()

  const productsWithPrices = await Promise.all(
    products.data.map(async (product) =>{
      const prices = await stripe.prices.list({product: product.id})
      const features = product.metadata.features || ""

      return{
        id: product.id,
        name: product.name,
        price: prices.data[0].unit_amount,
        img: product.images[0],
        currency: prices.data[0].currency,
        metadata: {features},
      }
    })
  )
  return productsWithPrices
};

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-fluid gap-12 items-start lg:mx-4">
     {products.map(product => 
      <Product {...product} key={product.id}/>
      )}
    </div>
  )
}
