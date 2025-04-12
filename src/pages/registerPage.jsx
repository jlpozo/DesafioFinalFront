import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


const Register = () => {
  
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPassword] = useState("");
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfPassword, setErrorConfPassword] = useState(false);
  const [telefono, setTelefono] = useState("");

  const navigate = useNavigate();

  const validarInput = (e) => {
    e.preventDefault()

    setError(false)
    setErrorPassword(false);
    setErrorConfPassword(false);    

    if(email === '' || password ==='' || confPass ==='' || nombre ==='' || telefono ===''){
      setError(true);
      setMensajeError("Todos los campos son obligatorios");
      return
    }
    if(password.length < 6){
      setErrorPassword(true);
      return
    }
    if(confPass != password){
      setErrorConfPassword(true);
      return
    }    
    
    RegistrarUser (nombre, email, password, telefono);
  }

  const RegistrarUser = async (nombre, email, password, telefono) => {
    try {
      const userData = { nombre, email, password, telefono };
      console.log("login", JSON.stringify(userData));
      const response = await axios.post(`${apiUrl}/v1/usuarios/registro`, 
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setError(null);
      setMensajeError(null);

      if (typeof Swal !== 'undefined') {
        await Swal.fire({
          title: 'Registro exitoso',
          text: 'Por favor, accede con tus credenciales',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
      } else {
        alert("Registro correcto, deberá acceder con sus credenciales");
      }

      // Redirigir al login
      navigate('/login');

      return { success: true, data: response.data };
  
    } catch (error) {
      console.error("Error en registro:", error);
    
      // Asignar mensaje de error según el tipo de error
      let mensajeError = "Error desconocido durante el registro";
      
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        const statusCode = error.response.status;
        
        if (statusCode === 401 || (statusCode === 400 && error.response.data?.error?.includes('email'))) {
          mensajeError = "El email ya está registrado";
        } else if (statusCode === 400) {
          mensajeError = error.response.data?.error || "Datos de registro inválidos";
        } else if (statusCode === 500) {
          mensajeError = "Error en el servidor. Intente más tarde";
        } else {
          mensajeError = error.response.data?.error || `Error ${statusCode} durante el registro`;
        }
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        mensajeError = "No se recibió respuesta del servidor. Verifique su conexión";
      } else {
        // Error al configurar la petición
        mensajeError = error.message || "Error al procesar la solicitud";
      }
      
      // Actualizar estados de error
      setError(statusCode);
      setMensajeError(mensajeError);
      
      return { 
        success: false, 
        error: mensajeError,
        details: error.response?.data || error.message
      };
    }
  };

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={validarInput}>
      {error ? <p className="error">Todos los campos son obligatorios</p> : null}
        <div className="form-group">
          
        <label>Ingrese su nombre</label>
          <input type= "text" className="form-control rounded-pill" name="Nombre" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)}/>
          <label>Ingrese su correo</label>
          <input type= "email" className="form-control rounded-pill" name="Email" placeholder="correo@correo.com" onChange={(e) => setEmail(e.target.value)}/>
          
          <label>Ingrese su contraseña</label>
          {errorPassword ? <p className="error">El password debe tener al menos 6 caracteres</p> : null}
          <input type= "password" className="form-control rounded-pill" placeholder="Contraseña" name="Password" onChange={(e) => setPassword(e.target.value)}/>
          
          <label>Confirme su contraseña</label>
          {errorConfPassword ? <p className="error">El password y la confirmación del password deben ser iguales</p> : null}
          <input type= "password" className="form-control rounded-pill" placeholder="Contraseña" name="ConfirmaPass" onChange={(e) => setConfPassword(e.target.value)}/>
          <label>Ingrese su teléfono</label>
          <input type= "tel" className="form-control rounded-pill" placeholder="+56999999999" maxLength="12" name="Telefono" onChange={(e) => setTelefono(e.target.value)}/>

          <button className="btn btn-dark mt-3 rounded-pill" type="submit">
            Enviar
          </button>
          <p>¿Ya tienes cuenta?
          <Link to="/login" className="ms-3 text-decoration-none">Accede aquí</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Register;
