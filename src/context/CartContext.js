import React, { createContext, useContext, useState, useEffect } from 'react';
import { createCart } from '../rest/cart'; // Import the createCart function

const CartContext = createContext();

export const useCart = () => {
   return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
   const [cart, setCart] = useState(null);

   useEffect(() => {
      const fetchCart = async () => {
         try {
            const newCart = await createCart();
            setCart(newCart);
         } catch (error) {
            console.error("Failed to create cart:", error);
         }
      };
      fetchCart();
   }, []);

   return (
      <CartContext.Provider value={{ cart, setCart }}>
         {children}
      </CartContext.Provider>
   );
};
