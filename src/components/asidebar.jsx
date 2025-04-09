/* import React from 'react'

function asidebar() {
  return (
    <div>asidebar</div>
  )
}

export default asidebar */
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';




function Sidebar() {
  /* const categories = [
    'Smartphones', 
    'Laptops', 
    'Accesorios', 
    'Audio', 
    'Almacenamiento'
  ] */
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
          <li> 
          <button onClick={() => obtenerProductosPorCategoria(categoria.id)}>
          {categoria.nombre}
           </button>

          </li>
        ))}
      </ul>
     </div>

/*     <div>
    <h1>Lista de Categorías:</h1>
    <ul>
        {categorias.map(categoria => (
            <li key={categoria.id}>
                <strong>{categoria.nombre}</strong>
            </li>
        ))}
    </ul>
</div> */
  )
}

export default Sidebar