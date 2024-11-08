import React, {useState, useEffect} from 'react'
import { getProducts } from "../../rest/product"
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
   const [productList, setProductList] = useState([])
   const navigate = useNavigate()

   const handleProduct = (productId) => {
        navigate(`pdp/${productId}`)
   }

   useEffect(()=>{
      async function fetchProducts(){
           const res = await getProducts();
           setProductList(res)
      }
      fetchProducts()
   },[])

     return(
        <ul className={styles.productsWrapper}>
         {
            productList?.map((item)=>
               <li className={styles.productWrapper} onClick={()=>{handleProduct(item?.productId)}}>
                  <img src={item?.pdpImage?.link} alt={item?.productName} width={50} height={50}></img>
                  <h5>{item?.productName}</h5>
                  <p>INR-{item?.price}</p>
               </li>
            )
         }
        </ul>
     )
}