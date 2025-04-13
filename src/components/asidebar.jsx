import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate, NavLink } from 'react-router-dom';




function Sidebar() {
 
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      obtenerCategorias();
  }, []);

    const obtenerCategorias = async () => {
      try {
          const response = await axios.get(`${apiUrl}/v1/categorias`);
          setCategorias(response.data.categorias);
      } catch (error) {
          console.error('Error:', error);
      }
  };

  const obtenerProductosPorCategoria = (id) => {
    //e.preventDefault();
    console.log("ID de la categoria:", id); // Añade este log
    navigate(`/${id}`);
};

  return (
    
    <div className="card mt-3">
    <div className="card-header">
        Categorías
    </div>
    <ul className="list-group list-group-flush">
        {categorias.map(categoria => (
            <li key={categoria.id} className="list-group-item">
                   <NavLink
                            to={`/${categoria.id}`}
                            /* className="nav-link"
                            activeClassName="active-link" */
                            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                    {categoria.nombre}
                    </NavLink>
            </li>
        ))}
    </ul>
</div>
  )
}

export default Sidebar