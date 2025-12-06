import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css'
import { Link } from "react-router-dom";




export function Login(){
    
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const navigate= useNavigate();

const handleLogin =async(e)=> {
    (e).preventDefault();

    try {

        const response =await axios.post('https://backendmysql.onrender.com/login',{email,password});
        if (response.data.message=== 'Bienvenido a la plataforma'){
            alert('Bienvenido')
            navigate ('/Inicio'); // Ingresa a la interfaz
         } else {
            alert('Usuario o contraseña incorrectos');
         }
    } catch(error){
        console.error('Error en inicio de Sesión:', error);
        alert('Error en el inicio de Sesión');
    }
  };

      return(
        <main>
        <form onSubmit={handleLogin}>
            <h1>Inicio de Sesión</h1>
            <p className="subtitle">Ingresa tus datos para continuar</p>
            
            <div className="input-group">
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            
            <div className="input-group">
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            
            <button type="submit">Ingresar</button>
            
            <p>
  ¿No tienes cuenta? 
  <Link to="/Register"> Regístrate aquí</Link>
</p>

        </form>
    </main>
    )
}
export default Login;