import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  
  const { token, setToken } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { isAdmin, setIsAdmin } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordIncorrecta, setErrorPasswordIncorrecta] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const validarInput = (e) => {
    e.preventDefault()
    setError(false)
    setErrorPassword(false);
    setErrorPasswordIncorrecta(false);
    setIsAdmin(false);

    if(email === '' || password ===''){
      setError(true);
      return
    }

    if(password.length < 6){
      setErrorPassword(true);
      setMensajeError("Password no cumple con política de seguridad");
      return
    }

    envioLogin(email,password);
  }

  /*const envioLogin = async (e) => {
    e.preventDefault();

    const response = await axios.get(`${apiUrl}/v1/usuarios/login/${categoriaId}`);
    const result = await login(email, password);
    if (result.success) {
        alert ('Login Succefull!!');
    }
  };  */

  const envioLogin = async (email, password) => {
    try {
      console.log("login", JSON.stringify({ email, password }));
      const response = await axios.post(`${apiUrl}/v1/usuarios/login`, 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      // Con axios, response.data ya contiene los datos JSON parseados
      const data = response.data;
      
      // Guardar token y datos del usuario
      setToken(data.token);
      setUser({ email: data.usuario.email });

      console.log('Objeto data completo:', data);
      console.log('admin????',data.usuario.es_admin);

      setIsAdmin(data.usuario.es_admin);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.email);
  
      setError(null);

      const saludo = `Bienvenid@ ${data.usuario.nombre}${data.usuario.es_admin ? ", eres Administrador" : ""}`;

      if (typeof Swal !== 'undefined') {
        await Swal.fire({
          title: 'Login correcto',
          text: saludo,
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
      } else {
        alert("Login correcto");
      }      

      return { success: true };
  
    } catch (error) {
      console.log("login nok");
      if (error.response = 401){
        setMensajeError("Email o password no coinciden");
      }else{
        setMensajeError(error.response?.data?.error || error.message);
      }
      setError(error.response?.data?.error || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  return (
    <>
      <form onSubmit={validarInput}>
        <h2>Bienvenid@</h2>
      {error ? <p className="error">{mensajeError}</p> : null}
        <div className="form-group">
          <label>Email</label>
          <input type= "email" className="form-control rounded-pill" name="Email" onChange={(e) => setEmail(e.target.value)}/>
          
          <label>Password</label>
          {errorPassword ? <p className="error">El password debe tener al menos 6 caracteres</p> : null}
          {errorPasswordIncorrecta ? <p className="error">Password incorrecta</p> : null}
          <input type= "password" className="form-control rounded-pill" name="Password" onChange={(e) => setPassword(e.target.value)}/>
          
          <button className="btn btn-dark mt-3 rounded-pill" type="submit">
            Iniciar sesión
          </button>
          
          <p>¿No tienes cuenta?
          <Link to="/register" className="ms-3 text-decoration-none">Regístrese aquí</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;