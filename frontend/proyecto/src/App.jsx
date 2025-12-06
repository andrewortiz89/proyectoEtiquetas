import React from 'react';

import { BrowserRouter, Router , Route , Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';
import Quien from './Quien';
import Inicio from'./Inicio';
import Register from './Register';
import GenerarEtiquetas from './GenerarEtiquetas';
import ListaEtiquetas from './ListaEtiquetas';
import VerEtiqueta from './VerEtiqueta';




function App() {
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path="/" element= {<Home/>} />
        <Route path="/Login" element= {<Login />} />
        <Route path="/Quien" element= {<Quien/>} />
        <Route path="/Inicio" element= {<Inicio/>} />
        <Route path="/Register" element= {<Register/>} />
        <Route path="/generar-etiqueta" element= {<GenerarEtiquetas/>} />
<Route path="/ListaEtiquetas" element= {<ListaEtiquetas/>} />
<Route path="/ver-etiqueta/:id" element={<VerEtiqueta />} />
        
        

      </Routes>
    </BrowserRouter>

  );
}

export default App;