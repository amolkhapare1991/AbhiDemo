import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../rest/product';
import { addToCart, createCart } from '../../rest/cart';
import styles from './ProductDescription.module.css'

export const ProductDescription = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const handleCart = async () => {
        try {
            const cart = await createCart();  
            const addLineItem = await addToCart(cart?.id, cart?.version, productId);   
            navigate(`/cart/${cart?.id}`);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    useEffect(() => {
        async function getProduct(id) {
            const res = await getProductById(id);
            setProduct(res);
        }
        getProduct(productId);
    }, []); 
   
    return (
        <div className={styles.productWrapper}>
            <img src={product?.pdpImage?.link?.[0]} alt={product?.productName} width={500} height={500} />
            <h4 className={styles.title}>{product?.productName}</h4>
            <button className={styles.button} onClick={handleCart}>Add to cart</button>
        </div>
    );
};
