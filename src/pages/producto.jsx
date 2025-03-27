import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css'
import { Table, Button, Image } from 'react-bootstrap';

function Producto() {
    const [producto, setProducto] = useState(null);  // Cambiado de [] a null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        console.log("ID recibido en Producto:", id); // Log para verificar el ID
        consultarApi();
    }, [id]);

    const consultarApi = async () => {
        try {
            setLoading(true);
            //const url = `http://localhost:5000/api/productos/${id}`;
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
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pizza) return <div>No se encontró la pizza</div>;

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
                                src={pizza.img} 
                                title={pizza.name} 
                                alt={pizza.name}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td align="left">#</td>
                        <td align="left">{pizza.id}</td>
                    </tr>
                    <tr>
                        <td align="left">Nombre</td>
                        <td align="left" className="capital">
                            <b>{producto.marca}</b>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">Descripción</td>
                        <td align="left">{producto.marca}</td>
                    </tr>
                    <tr>
                        <td align="left">Ingredientes</td>
                        <td align="left" className="capital">
                            {producto.desc && producto.desc.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td align="left">Precio</td>
                        <td align="left">${producto.price}</td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="dark">Añadir al carrito</Button>
        </div>
    );
}

export default Producto;