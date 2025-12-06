import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css';
import { Link } from "react-router-dom";


export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://backendmysql.onrender.com/register', { email, password });
      setMessage(response.data.message);
      alert('Registro Exitoso');
      navigate('/Login', { replace: true });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error al registrar el usuario');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Crear Cuenta</h1>
      <p className="subtitle">¡Regístrate y empieza a disfrutar de nuestras ventajas!</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingresa tu correo"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <p>
  ¿Ya tienes cuenta? <Link to="/Login">Iniciar sesión</Link>
</p>

    </main>
  );
}

export default Register;
