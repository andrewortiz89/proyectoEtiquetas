import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

const VerEtiqueta = () => {
  const [etiqueta, setEtiqueta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarQR, setMostrarQR] = useState(false);

  const etiquetaRef = useRef();
  const qrRef = useRef();

  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/etiquetas/${id}`);
        setEtiqueta(res.data);
      } catch (err) {
        console.error("Error cargando etiqueta", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --------------------------
  // Descargar PNG
  // --------------------------
  const descargarPNG = () => {
    const canvas = etiquetaRef.current;
    if (!canvas) return;

    const enlace = document.createElement("a");
    enlace.download = `etiqueta_${id}.png`;
    enlace.href = canvas.toDataURL("image/png");
    enlace.click();
  };

  // --------------------------
  // Exportar a PDF
  // --------------------------
  const exportarPDF = () => {
    const canvas = etiquetaRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(imgData, "PNG", 10, 20, 180, 80);

    // Si QR activo → agregarlo abajo
    if (mostrarQR && qrRef.current) {
      const qrCanvas = qrRef.current.querySelector("canvas");
      const qrImg = qrCanvas.toDataURL("image/png");
      pdf.addImage(qrImg, "PNG", 75, 120, 60, 60);
    }

    pdf.save(`etiqueta_${id}.pdf`);
  };

  // --------------------------
  // Imprimir etiqueta
  // --------------------------
  const imprimir = () => {
    window.print();
  };

  if (loading) return <h2>Cargando...</h2>;
  if (!etiqueta) return <h2>No existe esta etiqueta</h2>;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>

      <h1>Vista de Etiqueta #{etiqueta.id}</h1>

      {/* CANVAS DEL CÓDIGO DE BARRAS */}
      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          background: "white",
          borderRadius: "12px",
          width: "fit-content",
          boxShadow: "0 0 12px rgba(0,0,0,0.2)",
        }}
      >
        <img
          ref={etiquetaRef}
          src={etiqueta.imagen_base64}
          alt="Etiqueta"
          style={{ width: "300px" }}
        />

        <p style={{ marginTop: "10px", fontSize: "18px" }}>
          Tipo: <b>{etiqueta.tipo}</b>
        </p>
      </div>

      {/* QR OPCIONAL */}
      <div style={{ marginTop: "15px" }}>
        <label>
          <input
            type="checkbox"
            checked={mostrarQR}
            onChange={() => setMostrarQR(!mostrarQR)}
          />{" "}
          Mostrar QR
        </label>

        {mostrarQR && (
          <div ref={qrRef} style={{ marginTop: "10px" }}>
            <QRCodeCanvas value={etiqueta.texto} size={160} />
          </div>
        )}
      </div>

      {/* BOTONES */}
      <div style={{ marginTop: "25px" }}>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            background: "#28a745",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={imprimir}
        >
          🖨 Imprimir
        </button>

        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            background: "#007bff",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={descargarPNG}
        >
          📥 Descargar PNG
        </button>

        <button
          style={{
            padding: "10px 20px",
            background: "#ff5722",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={exportarPDF}
        >
          📄 Exportar PDF
        </button>

        <br />

        <a
          href="/ListaEtiquetas"
          style={{ display: "inline-block", marginTop: "20px" }}
        >
          ← Volver a la lista
        </a>
      </div>
    </div>
  );
};

export default VerEtiqueta;
