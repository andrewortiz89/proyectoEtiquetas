import React from "react";
import { useNavigate } from "react-router-dom";
import './Quien.css';
import { Building2, Users, Heart, Rocket, Target, Award, ArrowRight } from 'lucide-react';

const Quien = () => {
  const navigate = useNavigate();

  const handleRegistroClick = () => {
    navigate('/Register'); //  ruta a '/register'
  };

  return (
    <div className="cards-container">
      <div className="hero-section">
        <div className="animated-background"></div>
        <section className="section-header">
          <h2 className="main-title">¿Quiénes somos?</h2>
          <div className="title-underline"></div>
        </section>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="icon-container">
            <Building2 size={32} color="white" strokeWidth={2} />
          </div>
          <h3 className="card-title">Nuestra Empresa</h3>
          <div className="card-description">
            <p>
              En Etiquetas Express, estamos comprometidos con la excelencia en la creación de software
              innovador diseñado para transformar la manera en que las empresas gestionan sus operaciones
              y optimizan sus procesos.
            </p>
          </div>
          <div className="card-stats">
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Clientes</span>
            </div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Años</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="icon-container">
            <Users size={32} color="white" strokeWidth={2} />
          </div>
          <h3 className="card-title">Nuestro Equipo</h3>
          <div className="card-description">
            <p>
              Nuestro equipo está formado por profesionales apasionados y expertos en desarrollo de software,
              diseño de interfaces y soluciones tecnológicas avanzadas.
            </p>
          </div>
          <div className="expertise-tags">
            <span className="tag">Desarrollo</span>
            <span className="tag">Diseño UI/UX</span>
            <span className="tag">Innovación</span>
          </div>
        </div>

        <div className="card">
          <div className="icon-container">
            <Heart size={32} color="white" strokeWidth={2} />
          </div>
          <h3 className="card-title">Nuestros Valores</h3>
          <div className="card-description">
            <p>
              En Etiquetas Express, valoramos la innovación, la integridad y el compromiso con nuestros clientes.
              Construimos relaciones sólidas basadas en la confianza y resultados tangibles.
            </p>
          </div>
          <div className="values-list">
            <div className="value-item">
              <Target size={20} className="value-icon" />
              <span>Excelencia</span>
            </div>
            <div className="value-item">
              <Award size={20} className="value-icon" />
              <span>Calidad</span>
            </div>
          </div>
        </div>
      </div>

      <div className="vision-section">
        <div className="vision-content">
          <Rocket className="vision-icon" size={48} />
          <h3>Nuestra Visión</h3>
          <p>
            Desde startups hasta grandes corporaciones, nuestros productos y servicios han ayudado a una amplia gama
            de clientes a mejorar la eficiencia operativa, reducir costos y aumentar la productividad.
          </p>
          <div className="cta-container">
            <p className="cta-text">
              Únete a nosotros en nuestro viaje hacia el futuro de la tecnología empresarial. Descubre cómo
              <b> Etiquetas Express </b> puede transformar tu negocio hoy mismo.
            </p>
            <button 
              className="card-button"
              onClick={handleRegistroClick}
              aria-label="Ir a registro"
            >
              ¡Regístrate! <ArrowRight className="button-icon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quien;