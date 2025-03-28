import React from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { Button } from 'react-bootstrap';

export default function Increment({ index }) {
    const { cart, setCart, setTotal } = useContext(CartContext);

    const calculateTotal = (cartItems) => {
      const sum = cartItems.reduce((total, item) => total + (item.price * item.count), 0);
      setTotal(sum);
      console.log("Total:",sum);
    };


    const increment = () => {
        const newCart = [...cart];
        newCart[index].count += 1;
        setCart(newCart);
        calculateTotal(newCart);
    };

    const decrement = () => {
        const newCart = [...cart];
        if (newCart[index].count > 1) {
            newCart[index].count -= 1;
        } else {
            newCart.splice(index, 1);
        }
        setCart(newCart);
        calculateTotal(newCart);
    };

    const addToCart = (newItem) => {
      const existingIndex = cart.findIndex(item => item.name === newItem.name);
      const newCart = [...cart];

      if (existingIndex !== -1) {
          increment(existingIndex);
      } else {
          newCart.push({ ...newItem, count: 1 });
          setCart(newCart);
          calculateTotal(newCart);
      }
    };
    
    return (
        <div className="d-flex gap-2">
            <Button onClick={increment} variant="dark">+</Button>
            <Button onClick={decrement} variant="dark">-</Button>
        </div>
    );
}