import { useState, useEffect } from 'react';
import '../App.css'
//import {productos} from '../assets/js/products'
import { useParams } from 'react-router-dom';
import CardProduct from '../components/cardProducto'
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const ProductsPage = () => {
 
   const { id} = useParams();
 
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (id) {
        obtenerProductosPorCategoria(id); // Llama a la función con el nuevo ID
    }
}, [id]);
    
    //obtenerProductosPorCategoria(id);

const obtenerProductosPorCategoria = async (categoriaId) => {
    try {
        console.log(">>"+categoriaId);  // Log del ID de la categoría
        const response = await axios.get(`${apiUrl}/v1/productos/categoria/${categoriaId}`);
        console.log(`${apiUrl}/v1/productos/categoria/${categoriaId}`);
        setProductos(response.data.productos); // Actualización del estado con los datos obtenidos
        console.log(response.data.productos);
    } catch (error) {
        console.error('Error al obtener productos:', error); // Manejo del error
    }
    
}; 

  return (
    <>
      <div>
        {/*<Header/>*/}
      </div>
      {<Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {productos.map(producto =>
          <Col key={producto.id}>
            <CardProduct  id={producto.id}
                        marca={producto.marca}
                        price={producto.precio}
                        desc={producto.descripcion}
                        img={producto.imagen_url}
            />
          </Col>
          )}
        </Row>          
    </Container> }
    </>
  )
}

export default ProductsPage;