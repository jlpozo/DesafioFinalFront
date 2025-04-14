import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

const AddProductPublic = () => {
  const { token } = useContext(UserContext); // Obtener token desde el contexto
  const [formData, setFormData] = useState({
    nombre: "",
    imagen_url: "",
    descripcion: "",
    precio: "",
    caracteristicas: "",
    categoria_id: "", // Nuevo campo para categoría
  });

  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/categorias`);
        setCategorias(response.data.categorias);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar cambios en el combo box
  const handleCategoriaChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      categoria_id: e.target.value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/v1/productos`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccessMessage("¡Producto ingresado con éxito!");
        setFormData({
          nombre: "",
          imagen_url: "",
          descripcion: "",
          precio: "",
          caracteristicas: "",
          categoria_id: "",
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al ingresar el producto. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nuevo Producto</h1>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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

        <div className="mb-3">
          <label className="form-label">Imagen (URL):</label>
          <input
            type="text"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            className="form-control"
          />
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
          <label className="form-label">Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Características:</label>
          <input
            type="text"
            name="caracteristicas"
            value={formData.caracteristicas}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingrese una característica"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría:</label>
          <select
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleCategoriaChange}
            className="form-select"
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Ingresar Producto
        </button>
      </form>
    </div>
  );
};

export default AddProductPublic;
