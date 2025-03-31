import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function addProductPublic() {
    // Datos de ejemplo del producto (normalmente vendrían de una API o props)
    const [product] = useState({
      id: 1,
      name: "Smartphone TechPro X1",
      price: 299990,
      description: "El Smartphone TechPro X1 combina rendimiento excepcional con un diseño elegante. Con su potente procesador y cámara de alta resolución, este dispositivo te permite capturar momentos inolvidables y disfrutar de una experiencia móvil fluida.",
      image: "data:image/jpeg;base64,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", // Imagen de placeholder
      characteristics: [
        "Pantalla AMOLED de 6.5 pulgadas",
        "Procesador Octa-core 2.5GHz",
        "Cámara principal de 48MP + Gran angular 12MP",
        "Batería de 4500mAh con carga rápida",
        "8GB RAM / 128GB Almacenamiento",
        "Sistema Operativo Android 13"
      ],
      contact: {
        phone: "+56-66666666",
        instagram: "@TechStore",
        email: "ventas@techstore.com"
      }
    });
  
    // Función para formatear el precio en formato chileno
    const formatPrice = (price) => {
      return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
  
    return (
      <div className="container py-5">
        <div className="row">
          {/* Columna de la imagen */}
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="card-img-top img-fluid" 
              />
            </div>
          </div>
  
          {/* Columna de la información */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4">
              <h2 className="fw-bold mb-3">{product.name}</h2>
              
              <div className="mb-4">
                <h3 className="fs-1 fw-bold text-primary">
                  {formatPrice(product.price)}
                </h3>
              </div>
              
              <div className="mb-4">
                <h4 className="mb-2">Descripción</h4>
                <p>{product.description}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="mb-2">Características</h4>
                <ul className="list-group list-group-flush">
                  {product.characteristics.map((char, index) => (
                    <li key={index} className="list-group-item bg-transparent ps-0">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg">
                  <i className="bi bi-cart-plus me-2"></i>
                  Agregar al carrito
                </button>
              </div>
              
              <hr className="my-4" />
              
              <div className="contact-info">
                <h4 className="mb-3">¿Tienes preguntas?</h4>
                <p className="mb-2">
                  <i className="bi bi-telephone-fill me-2"></i>
                  {product.contact.phone}
                </p>
                <p className="mb-2">
                  <i className="bi bi-instagram me-2"></i>
                  <a href={`https://instagram.com/${product.contact.instagram.substring(1)}`} 
                     className="text-decoration-none" 
                     target="_blank" 
                     rel="noopener noreferrer">
                    {product.contact.instagram}
                  </a>
                </p>
                <p className="mb-2">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a href={`mailto:${product.contact.email}`} className="text-decoration-none">
                    {product.contact.email}
                  </a>
                </p>
              </div>
              
              <div className="mt-4">
                <Link to="/" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver a la tienda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default addProductPublic;