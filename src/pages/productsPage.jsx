import { useState, useEffect } from 'react';
import '../App.css'
import {productos} from '../assets/js/products'

import CardProduct from '../components/cardProducto'
import {Container, Row, Col} from 'react-bootstrap';



const ProductsPage = () => {
  //const [productos, setProductos] = useState([]);
 /*
  useEffect(() => {
    consultarApi();
  }, []);

  // 1 - Función que consulta la API
  const consultarApi = async () => {
    const url = "http://localhost:5000/api/product";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setProductos(data); 
  };*/
  
  return (
    <>
      <div>
        {/*<Header/>*/}
      </div>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {productos.map(producto =>
          <Col key={producto.id}>
            <CardProduct  id={producto.id}
                        marca={producto.marca}
                        price={producto.price}
                        descripcion={producto.desc}
                        img={producto.img}
            />
          </Col>
          )}
        </Row>          
    </Container>
    </>
  )
}

export default ProductsPage;