import React, {useState, useEffect} from 'react'
import { getProducts } from "../../rest/product"
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { addToCart, createCart, getCart, removeLineItem, updateLineItem } from '../../rest/cart'
export const Home = () => {
   const [productList, setProductList] = useState([])
   const [cart, setCart] = useState(null)
   const navigate = useNavigate()

   const handleProduct = (productId) => {
        navigate(`pdp/${productId}`)
   }

   const handleAddToCart = async (productId) => {
      try {
         const cartId = localStorage?.getItem('cartId')
         const cart =  cartId ? await getCart(cartId) : await createCart();  
         const cartRes = await addToCart(cart?.id, cart?.version, productId);   
         setCart(cartRes)
     } catch (error) {
         console.error("Error adding to cart:", error);
     }
   }

   const removeFromCart = async (productId) => {
      const lineItemId = cart?.lineItems?.find(item=>item?.productId===productId)?.id
      const res = await removeLineItem(cart?.id, cart?.version, lineItemId)
      setCart(res)
   }

   const isProductInCart = (productId) => {
      return cart?.lineItems?.find(item=>item?.productId===productId)
   }

   const manageQuantity = async(productId, action) => {
      const lineItem = cart?.lineItems?.find(item=>item?.productId===productId)
      const res = await updateLineItem(cart?.id, cart?.version, lineItem?.id, action==='add' ? lineItem?.quantity + 1 : lineItem?.quantity - 1 )
      setCart(res)
   }
   
   const handleQuantity = (productId) => {
      const product = isProductInCart(productId)
      return product ? product?.quantity : 0 
   }

   useEffect(()=>{
      async function fetchProducts(){
           const cartId = localStorage.getItem('cartId')
           const res = await getProducts();
           setProductList(res)
           if(cartId){
             const cartRes = await getCart(cartId)
             setCart(cartRes)
           }
      }
      fetchProducts()
   },[])
   console.log(111, productList)
   console.log(222, cart)
     return(
        <ul className={styles.productsWrapper}>
         {
            productList?.map((item)=>
               <li className={styles.productWrapper}>
                  <img onClick={()=>{handleProduct(item?.productId)}} className={styles.imgWrapper} src={item?.pdpImage?.link?.[0]} alt={item?.productName} width={50} height={50}></img>
                  <h5 className={styles.title}>{item?.productName}</h5>
                  <p className={styles.price}>INR-{item?.price}</p>
                  <div className={`${styles.quantityWrapper} ${handleQuantity(item?.productId) ?'':styles.quantityWrapper1}`}>
                     <button onClick={()=>manageQuantity(item?.productId, 'minus')}>-</button>
                     <input type='text' value={handleQuantity(item?.productId)}/>
                     <button onClick={()=>manageQuantity(item?.productId, 'add')}>+</button>
                  </div>
                  <div className={styles.buttonWrapper}>
                     <button className={styles.btn1}>Try me</button>
                     <button className={styles.btn2} onClick={()=>isProductInCart(item?.productId)?removeFromCart(item?.productId):handleAddToCart(item?.productId)}>{isProductInCart(item?.productId) ? `Remove from cart` : 'Add to Cart'}</button>
                  </div>
               </li>
            )
         }
        </ul>
     )
}