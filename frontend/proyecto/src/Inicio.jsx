import React from 'react';
import './Inicio.css';

const Inicio = () => {
  const buildActionCard = ({ icon, title, subtitle, color, onClick }) => (
    <div className="inicio-action-card" onClick={onClick}>
      <div className="inicio-action-card-icon" style={{ backgroundColor: `${color}16`, color: color }}>
        <i className="material-icons">{icon}</i>
      </div>
      <div className="inicio-action-card-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <i className="material-icons inicio-arrow-icon">arrow_forward_ios</i>
    </div>
  );

  const buildRecentLabelCard = ({ title, date }) => (
    <div className="inicio-recent-label-card">
      <i className="material-icons inicio-label-icon">label</i>
      <h4>{title}</h4>
      <p>{date}</p>
      <div className="inicio-card-actions">
        <button className="inicio-action-button inicio-edit">
          <i className="material-icons">edit</i>
        </button>
        <button className="inicio-action-button inicio-view">
          <i className="material-icons">visibility</i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="inicio-container">
      {/* Header Section */}
      <header className="inicio-header-section">
        <div className="inicio-header-content">
          <div className="inicio-header-text">
            <h1>¡Bienvenido!</h1>
            <p>Gestiona tus etiquetas de manera fácil y rápida</p>
          </div>
          <div className="inicio-header-stats">
            <div className="inicio-stat-card">
              <span className="inicio-stat-number">12</span>
              <span className="inicio-stat-label">Etiquetas Creadas</span>
            </div>
            <div className="inicio-stat-card">
              <span className="inicio-stat-number">5</span>
              <span className="inicio-stat-label">Plantillas</span>
            </div>
            <div className="inicio-stat-card">
              <span className="inicio-stat-number">3</span>
              <span className="inicio-stat-label">Proyectos Activos</span>
            </div>
          </div>
        </div>
      </header>

      <div className="inicio-main-content">
        <div className="inicio-content-grid">
          {/* Quick Actions Section */}
          <section className="inicio-section inicio-actions-section">
            <h2>Acciones Rápidas</h2>
            <div className="inicio-actions-container">
              {buildActionCard({
                icon: 'add_circle',
                title: 'Crear Etiqueta Nueva',
                subtitle: 'Diseña una etiqueta desde cero',
                color: '#4CAF50',
                onClick: () => console.log('Crear etiqueta')
              })}
              {buildActionCard({
                icon: 'insert_drive_file',
                title: 'Seleccionar Plantilla',
                subtitle: 'Usa una de nuestras plantillas prediseñadas',
                color: '#2196F3',
                onClick: () => console.log('Seleccionar plantilla')
              })}
              {buildActionCard({
                icon: 'folder_open',
                title: 'Ver Proyectos',
                subtitle: 'Explora tus proyectos activos',
                color: '#FFC107',
                onClick: () => console.log('Ver proyectos')
              })}
            </div>
          </section>

          {/* Recent Labels Section */}
          <section className="inicio-section inicio-recent-labels-section">
            <h2>Etiquetas Recientes</h2>
            <div className="inicio-recent-labels-grid">
              {buildRecentLabelCard({
                title: 'Etiqueta para Productos',
                date: '10 de Noviembre, 2024',
              })}
              {buildRecentLabelCard({
                title: 'Etiqueta para Documentos',
                date: '8 de Noviembre, 2024',
              })}
              {buildRecentLabelCard({
                title: 'Etiqueta de Evento',
                date: '7 de Noviembre, 2024',
              })}
            </div>
          </section>

          {/* Tip Card Section */}
          <section className="inicio-section inicio-tip-section">
            <div className="inicio-tip-card">
              <div className="inicio-tip-header">
                <i className="material-icons">lightbulb</i>
                <h3>Consejo Rápido</h3>
              </div>
              <p>Para organizar mejor tus proyectos, usa etiquetas con nombres claros y específicos. Esto te permitirá encontrar tus archivos más rápido.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
