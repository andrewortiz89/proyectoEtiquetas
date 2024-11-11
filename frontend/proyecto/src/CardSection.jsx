import React from 'react';
import icon1 from './assets/icon1.png';  // Ajusta la ruta según tu estructura
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';

const Card = ({ icon, title, description }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="icon-container">
          <img src={icon} alt={title} className="icon" />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <button className="card-button">Comenzar</button>
      </div>
      <div className="glow"></div>
    </div>
  );
};

const CardSection = () => {
  const cards = [
    {
      icon: icon1,
      title: "Nueva Etiqueta",
      description: "Crea una nueva etiqueta personalizada para tus productos"
    },
    {
      icon: icon2,
      title: "Editar Etiqueta",
      description: "Modifica etiquetas existentes según tus necesidades"
    },
    {
      icon: icon3,
      title: "Seleccionar Plantilla",
      description: "Elige entre nuestras plantillas prediseñadas"
    }
  ];

  return (
    <div className="cards-container">
      <div className="section-header">
        <h2>Gestión de Etiquetas</h2>
        <p>Selecciona una opción para comenzar a trabajar con tus etiquetas</p>
      </div>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSection;