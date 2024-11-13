import React from "react";
import './Home.css';
import video from './video1.mp4';
import ReactPlayer from 'react-player';
// Corregimos las rutas de importación
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
const Home = () => {
  return (
    <div className="home-container">
      {/* Sección Hero existente */}
      <div className="home-hero-section">
        <div className="home-content-wrapper">
          <div className="home-text-content">
            <h1 className="home-title">Bienvenido a nuestra empresa</h1>
            <p className="home-description">
              Somos una empresa dedicada a brindar soluciones innovadoras a nuestros
              clientes. Nuestro objetivo es ayudarte a alcanzar tus metas.
            </p>
            <a href="/Quien" className="home-cta-button">
              Más Información
            </a>
          </div>
          
          <div className="home-video-section">
            <div className="home-player-wrapper">
              <ReactPlayer 
                url={video} 
                controls 
                loop 
                className="home-react-player" 
                width="100%" 
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nueva sección de imágenes */}
      <div className="home-images-section">
        <div className="home-images-wrapper">
          <div className="home-image-container">
            <img src={img1} alt="Imagen 1" className="home-image" />
          </div>
          <div className="home-image-container">
            <img src={img2} alt="Imagen 2" className="home-image" />
          </div>
          <div className="home-image-container">
            <img src={img3} alt="Imagen 3" className="home-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
