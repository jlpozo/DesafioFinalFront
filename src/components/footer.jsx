import React from 'react'

function Footer() {
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <div className="small text-muted mb-0">
              &copy; TechStore {new Date().getFullYear()}. Todos los derechos reservados.
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <span className="me-3">Contáctenos: +56-66666666</span>
              <span>
                <i className="bi bi-instagram me-1"></i> 
                <a href="https://www.instagram.com/TechStore" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  @TechStore
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer