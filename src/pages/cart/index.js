import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getCart } from '../../rest/cart'

export const Cart = () => {
    const {cartId}=useParams()
    const [cart, setCart] = useState(null)

    useEffect(()=>{
        const fetchCart = async()=>{
             const cartRes = await getCart(cartId)
             setCart(cartRes)
        }
        fetchCart()
    },[])

    console.log(999, cart)
     return(
        <div>
            Cart Page
        </div>
     )
}