import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPassword] = useState("");
  const [error, setError] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorConfPassword, setErrorConfPassword] = useState(false)
  const [telefono, setTelefono] = useState("");

  const validarInput = (e) => {
    e.preventDefault()

    setError(false)
    setErrorPassword(false);
    setErrorConfPassword(false);    

    if(email === '' || password ==='' || confPass ==='' || nombre ==='' || telefono ===''){
      setError(true);
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

  }

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
