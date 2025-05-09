import { useState, useEffect } from 'react';
import '../App.css'
//import {productos} from '../assets/js/products'
import { useParams } from 'react-router-dom';
import CardProduct from '../components/cardEditProducto'
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;



const EditProductsPage = () => {

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

  // Nueva función para manejar la eliminación de productos
  const handleProductoEliminado = (productoId) => {
    // Actualiza el estado eliminando el producto con el ID dado
    setProductos(productos.filter(producto => producto.id !== productoId));
  };  
  
  return (
    <>
      <div>
       Edit
      </div>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {productos.map(producto =>
          <Col key={producto.id}>
            <CardProduct  id={producto.id}
                        marca={producto.marca}
                        precio={producto.precio}
                        descripcion={producto.descripcion}
                        imagen_url={producto.imagen_url}
                        onDelete={handleProductoEliminado} // Pasa la función de callback
            />
          </Col>
          )}
        </Row>          
    </Container>
    </>
  )
}

export default EditProductsPage;