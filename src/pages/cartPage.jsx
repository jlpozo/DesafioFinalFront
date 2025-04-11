import React from 'react';
import '../App.css';
import { useContext } from "react";
import { Table, Button } from 'react-bootstrap';
import Increment from '../components/increment';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const formatPrice = (valor) => valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function Cart() {
    const { cart, total } = useContext(CartContext);
    const { token } = useContext(UserContext);

    if (!cart) return <div>Carro vacío...</div>;

    return (
        <>            
        <Table responsive>
            <tbody>
                {cart.map((producto, i) => (
                    <tr key={i}>
                        <td>
                            <img className="img" width="80" height="70" src={producto.imagen_url} alt={producto.marca} />
                        </td>
                        <td><b>{producto.marca}</b> &nbsp;
                        <small>{producto.descripcion}</small>
                        </td>
                        
                        <td>
                            <Increment index={i} />
                        </td>
                        <td>{producto.count}</td>
                        <td>=</td>
                        <td>{formatPrice(producto.count * producto.precio)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5">Total</td>
                    <td>=</td>
                    <td className="fw-bold">${formatPrice(total)}</td>
                </tr>
            </tfoot>
        </Table>
        
        <Button disabled={!token} className="btn btn-dark mt-3 rounded-pill" variant="primary" onClick={null}>
            Comprar
        </Button> 
        </>
    );
}

export default Cart;