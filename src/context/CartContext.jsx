import { createContext, useState, useEffect } from 'react';
//import { productCart } from '../assets/js/products.js';
export const CartContext = createContext(null);

const productCart = [];

const CartProvider =({children}) => {
    const [cart, setCart] = useState(productCart);
    const [total, setTotal] = useState(0);


    useEffect(() => {
      //if (cart && cart.length > 0) {
          const initialTotal = cart.reduce((sum, item) => sum + (item.precio * item.count), 0);
          setTotal(initialTotal);
      //}
    }, [cart]);    

  return (
    <CartContext.Provider value={{ cart, setCart, total, setTotal}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;