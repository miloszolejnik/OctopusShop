import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import { AddToCartType } from './app/types/AddToCartType'

type CartState = {
    isOpen: boolean,
    cart: AddToCartType[],
    toggleCart: () => void,
    addProduct: (item: AddToCartType) => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) =>({
            cart: [],
            isOpen: false,
            toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
            addProduct: (item) => set((state) => {
                const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
                if(existingItem){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.id === item.id && cartItem.quantity){
                            return{...cartItem, quantity: cartItem.quantity + 1}
                        } 
                        return cartItem
                    })
                    return {cart: updatedCart}
                }else {
                    return{cart: [...state.cart, {...item, quantity: 1}]}
                }
            }),
        }),
        {name: 'cart-store'}
    )
)