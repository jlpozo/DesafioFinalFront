import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import '../App.css'
import { Table, Image } from 'react-bootstrap';
import {productos} from '../assets/js/products'
import AddCart from '../components/addCart';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const formatPrice = (valor) => valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function Product() {
    const [producto, setProducto] = useState(null);  // Cambiado de [] a null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        console.log("ID recibido en Producto:", id); // Log para verificar el ID
        setProducto(productos[0]);
        setLoading(false);
        //consultarApi();
    }, [id]);

    const navigate = useNavigate();

    const goToCart = (e) => {
        e.preventDefault();
        console.log("ID de la producto:", id); // Añade este log
        navigate(`/cart`);
    };    
    /*const consultarApi = async () => {
        try {
            setLoading(true);
            const url = `http://localhost:5000/api/productos/${id}`;
            console.log("Consultando URL:", url);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Datos recibidos de la API:", data);
            setProducto(data);
        } catch (error) {
            console.error("Error al obtener la producto:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };*/

    // Manejar los estados de carga y error
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!producto) return <div>No se encontró el producto</div>;

    return (
        <div className="container">
            <Table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="2" align="center">
                            <Image 
                                src={producto.img} 
                                title={producto.marca} 
                                alt={producto.marca}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td align="left">#</td>
                        <td align="left">{producto.id}</td>
                    </tr>
                    <tr>
                        <td align="left">Marca</td>
                        <td align="left" className="capital">
                            <b>{producto.marca}</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">Descripción</td>
                        <td align="left" className="capital">
                            {producto.desc && producto.desc.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td align="left">Precio</td>
                        <td align="left">${formatPrice(producto.price)}</td>
                    </tr>
                </tbody>
            </Table>
            <br/>
            <ButtonGroup style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                    <AddCart producto={producto}/>
                    <Button style={{marginRight: '5px'}} className="btn btn-dark mt-3 rounded-pill" variant="primary" onClick={goToCart}>
                        Comprar ahora
                    </Button>        
            </ButtonGroup>
        </div>
    );
}

export default Product;