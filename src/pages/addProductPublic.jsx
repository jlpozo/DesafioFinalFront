import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditProductPage = () => {
  // Datos iniciales del producto
  const [product, setProduct] = useState({
    id: 1,
    name: "Smartphone TechPro X1",
    price: 299990,
    description: "El Smartphone TechPro X1 combina rendimiento excepcional con un diseño elegante.",
    features: ["Procesador de alta velocidad", "Cámara de 48MP", "Pantalla AMOLED", "Batería de larga duración"],
    image: "https://example.com/image.jpg",
    contact: "contacto@techpro.com",
  });

  // Restablecer campos para nuevo producto
  const resetFields = () => {
    setProduct({
      id: null,
      name: "",
      price: "",
      description: "",
      features: [],
      image: "",
      contact: "",
    });
  };

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Manejo de cambios en las características
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      features: newFeatures,
    }));
  };

  // Agregar una nueva característica
  const addFeature = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      features: [...prevProduct.features, ""],
    }));
  };

  // Eliminar una característica
  const removeFeature = (index) => {
    const newFeatures = product.features.filter((_, i) => i !== index);
    setProduct((prevProduct) => ({
      ...prevProduct,
      features: newFeatures,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto actualizado:", product);
    alert("¡Producto actualizado con éxito!");
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Editar Producto</h2>
      <button
        type="button"
        onClick={resetFields}
        style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Nuevo Producto
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Imagen (URL):</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Características:</label>
          {product.features.map((feature, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                style={{ flex: 1, marginRight: '10px' }}
              />
              <button type="button" onClick={() => removeFeature(index)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={addFeature} style={{ marginTop: '10px' }}>
            Agregar característica
          </button>
        </div>
        <div>
          <label>Contacto:</label>
          <input
            type="email"
            name="contact"
            value={product.contact}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Guardar Cambios</button>
      </form>
      <Link to="/products" style={{ display: 'block', marginTop: '20px' }}>Volver a la lista de productos</Link>
    </div>
  );
};

export default EditProductPage;
