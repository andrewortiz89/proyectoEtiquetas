import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

// Imágenes
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";

const Home = () => {
  const codigosSoportados = [
    { nombre: "Code 128", icon: "📊", color: "#667eea" },
    { nombre: "Code 39", icon: "📋", color: "#48bb78" },
    { nombre: "EAN-13", icon: "🏪", color: "#ed8936" },
    { nombre: "EAN-8", icon: "🛒", color: "#f56565" },
    { nombre: "QR Code", icon: "📱", color: "#9f7aea" },
    { nombre: "Data Matrix", icon: "⬛", color: "#38b2ac" },
    { nombre: "PDF417", icon: "📄", color: "#ec4899" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section Limpio */}
      <div className="home-hero-modern">
        <div className="home-hero-content">
          <div className="home-hero-text">
            <div className="hero-badge">✨ Sin registro requerido</div>
            <h1 className="home-hero-title">
              Generador Profesional de&nbsp;
              <span className="gradient-text">Códigos de Barras</span>
            </h1>
            <p className="home-hero-description">
              Crea etiquetas profesionales con 7 tipos de códigos diferentes.
              Vista previa en tiempo real, plantillas personalizables y descarga
              instantánea.
            </p>

            <div className="home-hero-buttons">
              <Link to="/generar-etiqueta" className="btn-comenzar-ahora">
                <span className="btn-icon">🚀</span>
                <span>Comenzar Ahora</span>
                <span className="btn-arrow">→</span>
              </Link>

              <Link to="/Login" className="btn-crear-cuenta">
                <span className="btn-icon">👤</span>
                <span>Crear Cuenta</span>
              </Link>
            </div>

            <div className="home-hero-stats">
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-label">Tipos de Códigos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Plantillas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Etiquetas Gratis</span>
              </div>
            </div>
          </div>

          {/* Video limpio sin decoraciones */}
          <div className="home-hero-visual-clean">
            <div className="hero-video-wrapper">
              <video
                className="hero-video"
                src="/video1.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
              <div className="video-overlay-decoration"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Códigos Soportados */}
      <div className="codigos-section">
        <h2 className="section-title">7 Tipos de Códigos Soportados</h2>
        <p className="section-subtitle">
          Todos con vista previa en tiempo real
        </p>

        <div className="codigos-grid">
          {codigosSoportados.map((codigo, idx) => (
            <div
              key={idx}
              className="codigo-card"
              style={{ "--card-color": codigo.color }}
            >
              <div className="codigo-icon">{codigo.icon}</div>
              <span className="codigo-name">{codigo.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Características Principales */}
      <div className="features-modern-section">
        <h2 className="section-title">Características Destacadas</h2>

        <div className="features-modern-grid">
          <div className="feature-modern-card">
            <div
              className="feature-icon-wrapper"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <span className="feature-icon">⚡</span>
            </div>
            <h3>Vista Previa en Tiempo Real</h3>
            <p>
              Ve tu etiqueta mientras la creas, con actualización instantánea
            </p>
          </div>

          <div className="feature-modern-card">
            <div
              className="feature-icon-wrapper"
              style={{
                background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
              }}
            >
              <span className="feature-icon">🎨</span>
            </div>
            <h3>5 Plantillas Predefinidas</h3>
            <p>Clásica, Compacta, Grande, Industrial y Minimalista</p>
          </div>

          <div className="feature-modern-card">
            <div
              className="feature-icon-wrapper"
              style={{
                background: "linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)",
              }}
            >
              <span className="feature-icon">✅</span>
            </div>
            <h3>Validación Automática</h3>
            <p>Verifica el formato correcto para cada tipo de código</p>
          </div>

          <div className="feature-modern-card">
            <div
              className="feature-icon-wrapper"
              style={{
                background: "linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)",
              }}
            >
              <span className="feature-icon">📥</span>
            </div>
            <h3>Descarga Instantánea</h3>
            <p>Descarga tus etiquetas en PNG de alta calidad</p>
          </div>

          <div className="feature-modern-card">
            <div
              className="feature-icon-wrapper"
              style={{
                background: "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)",
              }}
            >
              <span className="feature-icon">🔓</span>
            </div>
            <h3>Sin Registro Requerido</h3>
            <p>Comienza a crear etiquetas inmediatamente</p>
          </div>

          <div className="feature-modern-card">
            <div
              className="feature-icon-wrapper"
              style={{
                background: "linear-gradient(135deg, #38b2ac 0%, #319795 100%)",
              }}
            >
              <span className="feature-icon">💾</span>
            </div>
            <h3>Almacenamiento Local</h3>
            <p>Tus datos se guardan en tu navegador</p>
          </div>
        </div>
      </div>

      {/* Ejemplos */}
      <div className="examples-section">
        <h2 className="section-title">Ejemplos de Uso</h2>
        <div className="examples-grid">
          <div className="example-card">
            <img src={img1} alt="Ejemplo 1" />
            <div className="example-overlay">
              <span className="example-badge">Retail</span>
            </div>
          </div>
          <div className="example-card">
            <img src={img2} alt="Ejemplo 2" />
            <div className="example-overlay">
              <span className="example-badge">Logística</span>
            </div>
          </div>
          <div className="example-card">
            <img src={img3} alt="Ejemplo 3" />
            <div className="example-overlay">
              <span className="example-badge">Industrial</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="cta-final-modern">
        <div className="cta-content">
          <h2>¿Listo para crear tu primera etiqueta?</h2>
          <p>
            No necesitas registrarte. Comienza ahora mismo de forma gratuita.
          </p>
          <Link to="/generar-etiqueta" className="btn-cta-final">
            Comenzar Ahora →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
