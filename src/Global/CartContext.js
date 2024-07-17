import React, { createContext, useEffect, useReducer } from 'react'
import { CartReducer } from './CartReducer'

export const CartContext = createContext();

export const CartContextProvider = (props) => {



 
    const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 })

    useEffect(() => {
        
    })


    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}