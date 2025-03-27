/* import React from 'react'

function header() {
  return (
    <div>header</div>
  )
} */

//export default header

import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="m-0">Tech Store</h1>
        <div>
          <Link to="/cart" className="btn btn-light">
            <i className="bi bi-cart"></i> Carrito
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header