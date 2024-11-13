import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCart, setShippingAddress } from '../rest/cart'
import { placeOrder } from '../rest/order'
import CartItem from './CartItems'
import { tryAll, tryMe } from '../utils/tryMe'

function Cart() {
  const { cartId } = useParams()
  const [cart, setCart] = useState(null)
  const [order, setOrder] = useState(null)

  const handlePlaceOrder = async () => {
    try {
      const responseCart = await setShippingAddress(cart?.id, cart?.version)
      const placeOrderRes = await placeOrder(responseCart?.id, responseCart?.version)
      setOrder(placeOrderRes)
    } catch (error) {
      console.log(error)
    }
  }
  const handleTryAll = () => {
    tryAll(cart?.lineItems);
  };


  useEffect(() => {
    const fetchCart = async () => {
      const cartRes = await getCart(cartId)
      setCart(cartRes)
    }
    fetchCart()
  }, [])
  return (
<div id="body">
  <div className="container">
    <div id="content" className="full">
      <div className="try-all-wrapper">
        <button className="try-all-btn"  onClick={()=>handleTryAll()}>Try All</button>
      </div>
      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th className="items">Items</th>
              <th className="price">Price</th>
              <th className="qnt">Quantity</th>
              <th className="total">Total</th>
              <th className="try-me"></th>
            </tr>
          </thead>
          <tbody>
            {cart?.lineItems?.map((item, index) => (
              <CartItem
                key={index} 
                image={item?.variant?.images?.[0]?.url || "images/6.jpg"} 
                name={item?.name['en-IN'] || "Lorem ipsum dolor"}
                price={item?.price?.value?.centAmount || "$1,350.00"}
                productId={item?.productId}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="total-count">
        <h4>Subtotal: {cart?.totalPrice?.centAmount}</h4>
        <h3>Total to pay: <strong>{cart?.totalPrice?.centAmount}</strong></h3>
        <button onClick={handlePlaceOrder} className="btn-grey">Finalize and pay</button>
      </div>
    </div>
  </div>
</div>

  );
}

export default Cart;
