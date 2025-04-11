import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import '../App.css'
import { Table, Image } from 'react-bootstrap';
//import {productos} from '../assets/js/products'
import AddCart from '../components/addCart';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


const formatPrice = (valor) => valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function Product() {
    const [producto, setProducto] = useState(null);  // Cambiado de [] a null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        console.log("ID recibido en Producto:", id); // Log para verificar el ID
        consultarApi();
    }, [id]);

    const navigate = useNavigate();

    const goToCart = (e) => {
        e.preventDefault();
        console.log("ID de la producto:", id); // Añade este log
        navigate(`/cart`);
    };    
    
    const consultarApi = async () => {
        try {
            setLoading(true);
            const url = `${apiUrl}/v1/productos/${id}`;
            console.log("Consultando URL:", url);
            
            const response = await axios.get(url);
            console.log("Datos recibidos de la API:", response.data);
            setProducto(response.data);
            setError(null);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            setError(error.message);
            // Usar el producto predeterminado como fallback
            setProducto(productos[0]);
        } finally {
            setLoading(false);
        }
    };

    // Manejar los estados de carga y error
    if (loading) return <div>Cargando...</div>;
    if (error && !producto) return <div>Error: {error}</div>;
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
                                src={producto.imagen_url} 
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
                            {producto.descripcion}
                        </td>
                    </tr>
                    <tr>
                        <td align="left">Precio</td>
                        <td align="left">${formatPrice(producto.precio)}</td>
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