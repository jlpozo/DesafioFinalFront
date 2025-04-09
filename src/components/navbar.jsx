/* import React from 'react'

function navbar() {
  return (
    <div>navbar</div>
  )
}

export default navbar */

import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Ingresar</Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to="/products">Productos</Link> */}
            </li>
          </ul>
          
          {/* Caja de búsqueda */}
          <form className="d-flex ms-auto me-3">
            <div className="input-group">
              <input 
                className="form-control" 
                type="search" 
                placeholder="Buscar" 
                aria-label="Buscar"
              />
              <button className="btn btn-outline-secondary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
        
        {/* Botón de carrito en gris oscuro */}
        <Link to="/cart" className="btn btn-secondary">
          <i className="bi bi-cart"></i> Carrito
        </Link>
      </div>
    </nav>
  )
}

export default Navbar