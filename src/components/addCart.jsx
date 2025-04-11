import React from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { Button } from 'react-bootstrap';

export default function AddCart({ producto }) {
    const { cart, setCart, setTotal } = useContext(CartContext);

    const calculateTotal = (cartItems) => {
        const sum = cartItems.reduce((total, item) => total + (item.precio * item.count), 0);
        setTotal(sum);
        console.log("Total:", sum);
    };

    const addToCart = () => {
        const newCart = [...cart];
        const existingIndex = cart.findIndex(item => item.name === producto.marca);

        if (existingIndex !== -1) {
            newCart[existingIndex].count += 1;
        } else {
            newCart.push({ ...producto, count: 1 });
        }
        
        setCart(newCart);
        calculateTotal(newCart);
    };

    return (


      <Button className="btn btn-dark mt-3 rounded-pill" variant="primary" onClick={addToCart}>
            Agregar al carro
        </Button>    
    ); 
}
