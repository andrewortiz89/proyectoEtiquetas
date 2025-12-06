import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo1.png';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'unset' : 'hidden';
    };

    return (
        <>
            <header className="main-header">
                <div className="nav-wrapper">
                    <img src={logo} alt="logo" className="nav-logo" />
                    
                    <button 
                        className="menu-toggle" 
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`menu-bar ${isOpen ? 'open' : ''}`}></span>
                        <span className={`menu-bar ${isOpen ? 'open' : ''}`}></span>
                        <span className={`menu-bar ${isOpen ? 'open' : ''}`}></span>
                    </button>

                    <nav className={`main-nav ${isOpen ? 'active' : ''}`}>
                        <Link to="/" className="nav-item" onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link to="/generar-etiqueta" className="nav-item nav-item-cta" onClick={toggleMenu}>
                            🏷️ Crear Etiqueta
                        </Link>
                        <Link to="/Quien" className="nav-item" onClick={toggleMenu}>
                            Nosotros
                        </Link>
                        <Link to="/Login" className="nav-item" onClick={toggleMenu}>
                            Login
                        </Link>
                    </nav>
                </div>
            </header>
            <div className="nav-spacer"></div>
        </>
    );
};

export default Navbar;