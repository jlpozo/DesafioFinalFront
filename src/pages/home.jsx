import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../components/cardProducto';
import CardEditProduct from '../components/cardEditProducto';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  // Cargar todas las categorías
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/categorias`);
        if (response.data && response.data.categorias) {
          setCategorias(response.data.categorias);
        }
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        setError('No se pudieron cargar las categorías');
      }
    };

    cargarCategorias();
  }, []);

  // Cargar todos los productos o productos por categoría
  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      
      try {
        let url = `${apiUrl}/v1/productos?limite=100`;
        
        if (categoriaSeleccionada) {
          url = `${apiUrl}/v1/productos?categoria_id=${categoriaSeleccionada}&limite=100`;
        }
        
        if (busqueda) {
          url += `&busqueda=${encodeURIComponent(busqueda)}`;
        }
        
        const response = await axios.get(url);
        if (response.data && response.data.productos) {
          setProductos(response.data.productos);
        }
        setError(null);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError('No se pudieron cargar los productos');
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [categoriaSeleccionada, busqueda]);

  // Manejar cambio de categoría
  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  // Manejar búsqueda
  const handleBusqueda = (e) => {
    e.preventDefault();
    // La búsqueda ya se ejecuta en el useEffect cuando busqueda cambia
  };

  // Manejar eliminación de producto (para administradores)
  const handleProductoEliminado = (productoId) => {
    setProductos(productos.filter(producto => producto.id !== productoId));
  };

  return (
    <div>
      <h2 className="mb-4">Nuestros productos</h2>
      
      {/* Mostrar mensaje de carga o error */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : productos.length === 0 ? (
        <div className="alert alert-info">No se encontraron productos</div>
      ) : (
        <Container>
          <Row xs={1} md={2} lg={3} className="g-4">
            {productos.map(producto => (
              <Col key={producto.id}>
                {isAdmin ? (
                  <CardEditProduct
                    id={producto.id}
                    marca={producto.nombre || producto.marca}
                    precio={producto.precio}
                    descripcion={producto.descripcion}
                    imagen_url={producto.imagen_url}
                    onDelete={handleProductoEliminado}
                  />
                ) : (
                  <CardProduct
                    id={producto.id}
                    marca={producto.nombre || producto.marca}
                    precio={producto.precio}
                    descripcion={producto.descripcion}
                    imagen_url={producto.imagen_url}
                  />
                )}
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Home;