import React, { useEffect, useState } from "react";

const ListaEtiquetas = () => {
  const [lista, setLista] = useState([]);

  const cargar = async () => {
    const res = await fetch("http://localhost:3000/api/etiquetas");
    const data = await res.json();
    setLista(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    await fetch(`http://localhost:3000/api/etiquetas/${id}`, {
      method: "DELETE",
    });
    cargar();
  };

  return (
    <div className="page-container">
      <h2>Mis Etiquetas</h2>

      {lista.map((e) => (
        <div key={e.id} className="card">
          <h3>{e.texto}</h3>

          <button onClick={() => (window.location.href = `/ver-etiqueta/${e.id}`)}>
            Ver
          </button>

          <button onClick={() => eliminar(e.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default ListaEtiquetas;
