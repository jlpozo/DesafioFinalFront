/* import React from 'react'

function main() {
  return (
    <div>main</div>
  )
}

export default main */

import React from 'react'
import ProductCard from './productCard'

function Products() {
  // Datos de ejemplo de productos
  const products = [
    {
      id: 1,
      name: 'Smartphone Pro',
      description: 'Smartphone de última generación',
      price: 599.99,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      name: 'Laptop Ultrabook',
      description: 'Laptop ultradelgada de alto rendimiento',
      price: 1299.99,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      name: 'Auriculares Inalámbricos',
      description: 'Auriculares con cancelación de ruido',
      price: 199.99,
      image: 'https://via.placeholder.com/300x200'
    }
  ]

  return (
    <div className="container-fluid mt-3">
      <h2>Nuestros Productos</h2>
      <div className="row">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  )
}

export default Products
