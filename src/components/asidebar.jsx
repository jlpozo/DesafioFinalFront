/* import React from 'react'

function asidebar() {
  return (
    <div>asidebar</div>
  )
}

export default asidebar */
import React from 'react'

function Sidebar() {
  const categories = [
    'Smartphones', 
    'Laptops', 
    'Accesorios', 
    'Audio', 
    'Almacenamiento'
  ]

  return (
    <div className="card mt-3">
      <div className="card-header">
        Categorías
      </div>
      <ul className="list-group list-group-flush">
        {categories.map((category, index) => (
          <li 
            key={index} 
            className="list-group-item list-group-item-action"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar