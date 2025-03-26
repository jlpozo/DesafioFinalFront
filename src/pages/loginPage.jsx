import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  
  const { token, setToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorPasswordIncorrecta, setErrorPasswordIncorrecta] = useState(false)

  const validarInput = (e) => {
    e.preventDefault()

    setError(false)
    setErrorPassword(false);
    setErrorPasswordIncorrecta(false);

    if(email === '' || password ===''){
      setError(true);
      return
    }
    if(password.length < 6){
      setErrorPassword(true);
      return
    }
    if(password!= '123456'){
        setErrorPasswordIncorrecta(true);
        return
    }
    
    setToken(true);
    console.log("logout", token);
  
    alert ('Login Succefull!!')

  }

  return (
    <>
      <form onSubmit={validarInput}>
        <h1>ElectroTech</h1>
        <h2>Bienvenid@</h2>
      {error ? <p className="error">Todos los campos son obligatorios</p> : null}
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