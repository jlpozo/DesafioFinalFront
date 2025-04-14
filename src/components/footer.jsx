import React from 'react'

function Footer() {
  return (
<footer className="bg-light py-4 mt-auto">
  <div className="container">
    <div className="row">
      {/* Contáctenos y redes sociales alineados a la izquierda */}
      <div className="col text-start">
        <div>
          <span>Contáctenos: +56-66666666</span>
        </div>
        <div className="mt-2">
          <i className="bi bi-instagram me-1"></i>
          <a 
            href="https://www.instagram.com/TechStore" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-decoration-none"
          >
            @TechStore
          </a>
        </div>
      </div>

      {/* Copyright alineado a la derecha */}
      <div className="col text-end">
        <div className="small text-muted">
          &copy; TechStore {new Date().getFullYear()}. Todos los derechos reservados.
        </div>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer