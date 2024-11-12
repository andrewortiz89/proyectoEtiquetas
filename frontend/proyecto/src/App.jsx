import React from 'react';

import { BrowserRouter, Router , Route , Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';
import Quien from './Quien';
import Inicio from'./Inicio';
import Register from './Register';




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
        
       

      </Routes>
    </BrowserRouter>

  );
}

export default App;