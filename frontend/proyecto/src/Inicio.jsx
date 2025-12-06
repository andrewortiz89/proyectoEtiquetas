import React, { useEffect, useState } from "react";
import "./Inicio.css";

const Inicio = () => {
  const [etiquetasRecientes, setEtiquetasRecientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    estaSemana: 0,
    masUsado: "CODE128"
  });

  useEffect(() => {
    // Cargar etiquetas recientes (simulado - conectar con tu API)
    const cargarDatos = async () => {
      try {
        // Aquí conectarías con tu API
        // const res = await fetch("URL/api/etiquetas");
        // const data = await res.json();
        
        // Simulado por ahora
        setEstadisticas({
          total: 12,
          estaSemana: 5,
          masUsado: "QR Code"
        });
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    cargarDatos();
  }, []);

  const tiposRapidos = [
    { id: "CODE128", nombre: "Code 128", icon: "📊", color: "#667eea" },
    { id: "QR", nombre: "QR Code", icon: "📱", color: "#9f7aea" },
    { id: "EAN13", nombre: "EAN-13", icon: "🏪", color: "#ed8936" },
    { id: "CODE39", nombre: "Code 39", icon: "📋", color: "#48bb78" }
  ];

  const plantillasRapidas = [
    { id: "clasica", nombre: "Clásica", icon: "🎯", desc: "Uso general" },
    { id: "compacta", nombre: "Compacta", icon: "📦", desc: "Espacios pequeños" },
    { id: "grande", nombre: "Grande", icon: "📋", desc: "Mayor visibilidad" }
  ];

  return (
    <div className="dashboard-container">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="welcome-title">¡Bienvenido de nuevo! 👋</h1>
          <p className="welcome-subtitle">Crea y gestiona tus etiquetas profesionales</p>
        </div>

        <button 
          className="btn-nueva-etiqueta"
          onClick={() => window.location.href = "/generar-etiqueta"}
        >
          <span className="btn-icon">➕</span>
          <span>Nueva Etiqueta</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card" style={{ '--card-color': '#667eea' }}>
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.total}</span>
            <span className="stat-label">Etiquetas Creadas</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--card-color': '#48bb78' }}>
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.estaSemana}</span>
            <span className="stat-label">Esta Semana</span>
          </div>
        </div>

        <div className="stat-card" style={{ '--card-color': '#9f7aea' }}>
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.masUsado}</span>
            <span className="stat-label">Más Usado</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        {/* Panel de Acceso Rápido */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Crear Rápido</h2>
            <span className="panel-subtitle">Selecciona un tipo</span>
          </div>

          <div className="quick-types-grid">
            {tiposRapidos.map(tipo => (
              <div 
                key={tipo.id}
                className="quick-type-card"
                style={{ '--hover-color': tipo.color }}
                onClick={() => {
                  localStorage.setItem('tipo-seleccionado', tipo.id);
                  window.location.href = "/generar-etiqueta";
                }}
              >
                <div className="quick-icon">{tipo.icon}</div>
                <span className="quick-name">{tipo.nombre}</span>
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <div className="panel-header" style={{ marginTop: '2rem' }}>
            <h2 className="panel-title">Plantillas</h2>
            <span className="panel-subtitle">Usa un diseño predefinido</span>
          </div>

          <div className="plantillas-rapidas">
            {plantillasRapidas.map(plantilla => (
              <div 
                key={plantilla.id}
                className="plantilla-rapida-card"
                onClick={() => {
                  localStorage.setItem('plantilla-seleccionada', plantilla.id);
                  window.location.href = "/generar-etiqueta";
                }}
              >
                <div className="plantilla-icon">{plantilla.icon}</div>
                <div className="plantilla-text">
                  <span className="plantilla-nombre">{plantilla.nombre}</span>
                  <span className="plantilla-descripcion">{plantilla.desc}</span>
                </div>
                <span className="plantilla-arrow">→</span>
              </div>
            ))}
          </div>

          <button 
            className="btn-ver-todas"
            onClick={() => window.location.href = "/generar-etiqueta"}
          >
            Ver todas las opciones →
          </button>
        </div>

        {/* Panel de Etiquetas Recientes */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2 className="panel-title">Recientes</h2>
            <a href="/ListaEtiquetas" className="panel-link">Ver todas →</a>
          </div>

          {etiquetasRecientes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p className="empty-title">Sin etiquetas aún</p>
              <p className="empty-text">
                Crea tu primera etiqueta para verla aquí
              </p>
              <button 
                className="btn-empty-action"
                onClick={() => window.location.href = "/generar-etiqueta"}
              >
                Crear Primera Etiqueta
              </button>
            </div>
          ) : (
            <div className="recientes-grid">
              {etiquetasRecientes.map(etiqueta => (
                <div key={etiqueta.id} className="etiqueta-reciente-card">
                  <div className="etiqueta-preview">
                    <img src={etiqueta.imagen_base64} alt="Preview" />
                  </div>
                  <div className="etiqueta-info">
                    <span className="etiqueta-tipo">{etiqueta.tipo}</span>
                    <span className="etiqueta-fecha">{etiqueta.fecha}</span>
                  </div>
                  <button 
                    className="btn-ver-etiqueta"
                    onClick={() => window.location.href = `/ver-etiqueta/${etiqueta.id}`}
                  >
                    Ver
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tips y Ayuda */}
      <div className="tips-section">
        <div className="tip-card">
          <div className="tip-icon">💡</div>
          <div className="tip-content">
            <h3 className="tip-title">Consejo del día</h3>
            <p className="tip-text">
              Los códigos QR pueden almacenar URLs completas. Úsalos para 
              redirigir a páginas web, formularios o información de contacto.
            </p>
          </div>
        </div>

        <div className="tip-card">
          <div className="tip-icon">🎨</div>
          <div className="tip-content">
            <h3 className="tip-title">Plantillas personalizadas</h3>
            <p className="tip-text">
              Experimenta con diferentes plantillas para encontrar el tamaño 
              perfecto para tus necesidades específicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;