import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import { UserContext } from "../context/UserContext";

const apiUrl = import.meta.env.VITE_API_URL;

function Navbar() {
  const { token, isAdmin, setToken } = useContext(UserContext);
  const [prods, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/"); // Navegar al inicio cuando el token sea null
    }
  }, [token]);

  const options = {
    keys: ["nombre"],
    threshold: 0.4,
  };
  const fuse = new Fuse(prods, options);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/productos`);
        setProductos(response.data.productos || []);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const prodsFiltrados = buscar.trim()
    ? fuse.search(buscar).map((resultado) => resultado.item)
    : prods;

  const manejarCambio = (e) => {
    const valor = e.target.value;
    setBuscar(valor);
    setMostrarResultados(valor.trim().length > 0);
  };

  const manejarSeleccion = (producto, id) => {
    setBuscar(producto.nombre);
    setMostrarResultados(false);
    navigate(`/product/${id}`);
  };

  const handleLogout = () => {
    setToken(null); 
    navigate("/");// Elimina el token del contexto
    location.href ="../Pages/Home";
  };

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
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              {isAdmin ? (
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>

          <form
            className="d-flex ms-auto me-3"
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                value={buscar}
                onChange={manejarCambio}
                onFocus={() => setMostrarResultados(true)}
              />
              <button className="btn btn-outline-secondary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>

            {mostrarResultados && (
              <div className="list-group">
                {prodsFiltrados.length > 0 ? (
                  prodsFiltrados.map((producto) => (
                    <button
                      key={producto.id}
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={() => manejarSeleccion(producto, producto.id)}
                    >
                      {producto.nombre}
                    </button>
                  ))
                ) : (
                  <div className="list-group-item">
                    No se encontraron resultados
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {isAdmin ? (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/addProductPublic")}
          >
            Nuevo
          </button>
        ) : (
          <Link to="/cart" className="btn btn-secondary">
            <i className="bi bi-cart"></i> Carrito
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
