import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useContext } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const ProductEditor = () => {
  const { id } = useParams();
  const { token, user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    marca: '',
    descripcion: '',
    caracteristicas: '',
    stock: 0,
    imagen_url: ''
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${apiUrl}/v1/productos/${id}`);
        setProduct(data);
        setFormData({
          nombre: data.nombre,
          precio: formatPrice(data.precio),
          marca: data.marca,
          descripcion: data.descripcion,
          caracteristicas: data.caracteristicas,
          stock: data.stock,
          imagen_url: data.imagen_url
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // Function to format price with thousand separators
  const formatPrice = (price) => {
    return parseInt(price).toLocaleString('es-CL'); // Chilean locale for formatting
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'stock' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Prepare price for the server (removing thousand separators)
      const preparedFormData = {
        ...formData,
        precio: parseInt(formData.precio.replace(/\./g, ''))
      };
      const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    console.log(`${apiUrl}/v1/productos/${id}`, JSON.stringify(preparedFormData),config);
      const { data } = await axios.put(`${apiUrl}/v1/productos/${id}`, preparedFormData,config);
      setProduct(data);
      setSuccessMessage('¡Producto actualizado con éxito!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading && !product) return <div className="text-center p-4">Cargando producto...</div>;
  if (error && !product) return <div className="text-danger p-4">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h3 className="mb-4">Producto: {product?.nombre}</h3>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Precio:</label>
            <input
              type="text"
              name="precio"
              value={formData.precio}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/[^0-9]/g, ''); // Keep only numeric values
                const formattedValue = parseInt(rawValue || 0).toLocaleString('es-CL');
                setFormData((prevState) => ({
                  ...prevState,
                  precio: formattedValue
                }));
              }}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Marca:</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Características:</label>
          <textarea
            name="caracteristicas"
            value={formData.caracteristicas}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">URL de imagen:</label>
          <input
            type="text"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default ProductEditor;
