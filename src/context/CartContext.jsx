import { createContext, useState, useEffect } from 'react';
export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadingCart, setLoadingCart] = useState(false);

    // Calcular el total cuando cambia el carrito
    useEffect(() => {
        const initialTotal = cart.reduce((sum, item) => sum + (item.precio * item.count), 0);
        setTotal(initialTotal);
    }, [cart]);

    // Calcular el total manualmente (útil después de operaciones específicas)
    const calculateTotal = (cartItems) => {
        const sum = cartItems.reduce((total, item) => total + (item.precio * item.count), 0);
        setTotal(sum);
    };

    // Añadir un producto al carrito
    const addToCart = (product) => {
        setLoadingCart(true);
        const newCart = [...cart];
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
            newCart[existingIndex].count += 1;
        } else {
            newCart.push({ ...product, count: 1 });
        }
        
        setCart(newCart);
        calculateTotal(newCart);
        setLoadingCart(false);
    };

    // Modificar la cantidad de un producto en el carrito
    const updateQuantity = (index, newCount) => {
        if (newCount < 1) return;
        
        const updatedCart = [...cart];
        updatedCart[index].count = newCount;
        setCart(updatedCart);
        calculateTotal(updatedCart);
    };

    // Eliminar un producto del carrito
    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        calculateTotal(updatedCart);
    };

    // Limpiar completamente el carrito
    const clearCart = () => {
        setCart([]);
        setTotal(0);
    };

    return (
        <CartContext.Provider 
            value={{ 
                cart, 
                setCart, 
                total, 
                setTotal, 
                addToCart, 
                updateQuantity, 
                removeFromCart, 
                clearCart, 
                loadingCart 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;