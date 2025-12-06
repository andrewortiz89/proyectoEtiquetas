import React, { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import "./GenerarEtiquetas.css";

const GenerarEtiquetas = () => {
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("CODE128");
  const [plantilla, setPlantilla] = useState("clasica");
  const [descripcion, setDescripcion] = useState(""); // ✅ NUEVO CAMPO
  const [error, setError] = useState("");
  const [modoDemo, setModoDemo] = useState(!localStorage.getItem("usuario"));
  const [mostrarSelectorTipo, setMostrarSelectorTipo] = useState(false);

  const barcodeRef = useRef(null);
  const qrRef = useRef(null);

  // Tipos de códigos soportados
  const tiposCodigos = [
    { id: "CODE128", nombre: "Code 128", icon: "📊", descripcion: "Alfanumérico completo" },
    { id: "CODE39", nombre: "Code 39", icon: "📋", descripcion: "Alfanumérico básico" },
    { id: "EAN13", nombre: "EAN-13", icon: "🏪", descripcion: "Productos comerciales" },
    { id: "EAN8", nombre: "EAN-8", icon: "🛒", descripcion: "Productos pequeños" },
    { id: "QR", nombre: "QR Code", icon: "📱", descripcion: "URLs y datos complejos" },
    { id: "DATAMATRIX", nombre: "Data Matrix", icon: "⬛", descripcion: "Espacios reducidos" },
    { id: "PDF417", nombre: "PDF417", icon: "📄", descripcion: "Documentos oficiales" }
  ];

  // Plantillas predefinidas
  const plantillasDisponibles = [
    {
      id: "clasica",
      nombre: "Clásica",
      preview: "🎯",
      descripcion: "Estándar, ideal para uso general",
      config: { height: 80, width: 2, fontSize: 14, margin: 10 }
    },
    {
      id: "compacta",
      nombre: "Compacta",
      preview: "📦",
      descripcion: "Tamaño reducido para espacios pequeños",
      config: { height: 50, width: 1.5, fontSize: 10, margin: 5 }
    },
    {
      id: "grande",
      nombre: "Grande",
      preview: "📋",
      descripcion: "Mayor tamaño para mejor visibilidad",
      config: { height: 120, width: 3, fontSize: 18, margin: 15 }
    },
    {
      id: "industrial",
      nombre: "Industrial",
      preview: "🏭",
      descripcion: "Robusta para entornos industriales",
      config: { height: 100, width: 2.5, fontSize: 16, margin: 12 }
    },
    {
      id: "minimalista",
      nombre: "Minimalista",
      preview: "✨",
      descripcion: "Sin texto, solo código",
      config: { height: 70, width: 2, fontSize: 0, margin: 8 }
    }
  ];

  const esValido = (value, tipoCode) => {
    switch (tipoCode) {
      case "EAN13":
        return /^[0-9]{12,13}$/.test(value);
      case "EAN8":
        return /^[0-9]{7}$/.test(value); // ✅ CORREGIDO: Solo 7 dígitos
      case "CODE39":
        return /^[A-Z0-9\-\.\ \$\/\+\%]+$/.test(value);
      default:
        return value.length > 0;
    }
  };

  // GENERAR PREVIEW
  useEffect(() => {
    if (!texto) {
      setError("");
      return;
    }

    const plantillaActual = plantillasDisponibles.find(p => p.id === plantilla);

    try {
      if (tipo === "QR") {
        if (qrRef.current) {
          QRCode.toCanvas(qrRef.current, texto, { 
            width: 200,
            margin: 2,
            errorCorrectionLevel: 'M'
          });
          setError("");
        }
        return;
      }

      if (tipo === "DATAMATRIX" || tipo === "PDF417") {
        setError(`${tipo} estará disponible próximamente`);
        return;
      }

      if (!esValido(texto, tipo)) {
        if (tipo === "EAN13") setError("EAN-13 requiere 12-13 dígitos");
        else if (tipo === "EAN8") setError("EAN-8 requiere exactamente 7 dígitos"); // ✅ MENSAJE CORREGIDO
        else if (tipo === "CODE39") setError("Code 39: solo mayúsculas, números y -.$/%+");
        else setError("Formato inválido");
        
        if (barcodeRef.current) {
          const ctx = barcodeRef.current.getContext("2d");
          ctx.clearRect(0, 0, barcodeRef.current.width, barcodeRef.current.height);
        }
        return;
      }

      if (barcodeRef.current) {
        JsBarcode(barcodeRef.current, texto, {
          format: tipo,
          lineColor: "#000",
          width: plantillaActual.config.width,
          height: plantillaActual.config.height,
          displayValue: plantillaActual.config.fontSize > 0,
          fontSize: plantillaActual.config.fontSize,
          margin: plantillaActual.config.margin
        });
        setError("");
      }
    } catch (err) {
      setError("Error al generar: " + err.message);
      console.error(err);
    }
  }, [texto, tipo, plantilla]);

  const descargarEtiqueta = () => {
    if (!texto || error) return;

    try {
      let canvas = tipo === "QR" ? qrRef.current : barcodeRef.current;
      const enlace = document.createElement("a");
      enlace.download = `etiqueta_${tipo}_${Date.now()}.png`;
      enlace.href = canvas.toDataURL("image/png");
      enlace.click();
      
      if (modoDemo) {
        alert("✅ Etiqueta descargada. Regístrate para guardar tu historial.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const guardar = async () => {
    if (!texto || error) return;

    try {
      let imagen_base64 = tipo === "QR" 
        ? qrRef.current.toDataURL("image/png")
        : barcodeRef.current.toDataURL("image/png");

      const response = await fetch("https://proyectoetiquetasexpress.onrender.com/api/etiquetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          texto, 
          tipo, 
          imagen_base64, 
          plantilla,
          descripcion // ✅ ENVIAR DESCRIPCIÓN
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Etiqueta guardada");
        window.location.href = "/ListaEtiquetas";
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
    }
  };

  const tipoSeleccionado = tiposCodigos.find(t => t.id === tipo);
  const plantillaSeleccionada = plantillasDisponibles.find(p => p.id === plantilla);

  // ✅ FUNCIÓN PARA OBTENER PLACEHOLDER SEGÚN TIPO
  const getPlaceholder = () => {
    switch(tipo) {
      case "EAN13": return "123456789012 (12 dígitos)";
      case "EAN8": return "1234567 (7 dígitos)";
      case "CODE39": return "CODIGO39";
      case "QR": return "https://ejemplo.com";
      default: return "Ingresa el contenido";
    }
  };

  return (
    <div className="etiquetas-modern-container">
      {/* Header con info del modo */}
      {modoDemo && (
        <div className="demo-banner-modern">
          <div className="demo-content">
            <span className="demo-icon">🎯</span>
            <div className="demo-text">
              <strong>Modo Invitado</strong>
              <p>Crea y descarga etiquetas sin registro</p>
            </div>
          </div>
          <a href="/Login" className="demo-link">Crear cuenta →</a>
        </div>
      )}

      <div className="etiquetas-grid">
        {/* Panel izquierdo - Configuración */}
        <div className="config-panel">
          <h2 className="panel-title">Crear Etiqueta</h2>

          {/* Selector de tipo con chips */}
          <div className="form-section">
            <label className="section-label">Tipo de Código</label>
            <div 
              className="tipo-selector-trigger"
              onClick={() => setMostrarSelectorTipo(!mostrarSelectorTipo)}
            >
              <div className="tipo-selected">
                <span className="tipo-icon">{tipoSeleccionado.icon}</span>
                <div className="tipo-info">
                  <span className="tipo-name">{tipoSeleccionado.nombre}</span>
                  <span className="tipo-desc">{tipoSeleccionado.descripcion}</span>
                </div>
              </div>
              <span className="dropdown-arrow">{mostrarSelectorTipo ? "▲" : "▼"}</span>
            </div>

            {mostrarSelectorTipo && (
              <div className="tipo-chips-container">
                {tiposCodigos.map(tipoItem => (
                  <div
                    key={tipoItem.id}
                    className={`tipo-chip ${tipo === tipoItem.id ? 'active' : ''}`}
                    onClick={() => {
                      setTipo(tipoItem.id);
                      setMostrarSelectorTipo(false);
                      setTexto("");
                    }}
                  >
                    <span className="chip-icon">{tipoItem.icon}</span>
                    <div className="chip-content">
                      <span className="chip-name">{tipoItem.nombre}</span>
                      <span className="chip-desc">{tipoItem.descripcion}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input de texto */}
          <div className="form-section">
            <label className="section-label">
              Contenido del Código
              <span className="label-hint">
                {tipo === "EAN13" ? "(12-13 dígitos)" : 
                 tipo === "EAN8" ? "(7 dígitos)" : 
                 tipo === "CODE39" ? "(Mayúsculas y números)" : 
                 "(Cualquier texto)"}
              </span>
            </label>
            <input
              type="text"
              className="modern-input"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder={getPlaceholder()}
            />
          </div>

          {/* ✅ NUEVO CAMPO DE DESCRIPCIÓN */}
          <div className="form-section">
            <label className="section-label">
              Descripción / Notas
              <span className="label-hint">(Opcional)</span>
            </label>
            <textarea
              className="modern-textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Producto XYZ, Lote 2024, Almacén A..."
              rows="3"
            />
          </div>

          {/* Selector de plantillas */}
          <div className="form-section">
            <label className="section-label">Plantilla</label>
            <div className="plantillas-grid">
              {plantillasDisponibles.map(plant => (
                <div
                  key={plant.id}
                  className={`plantilla-card ${plantilla === plant.id ? 'active' : ''}`}
                  onClick={() => setPlantilla(plant.id)}
                >
                  <div className="plantilla-preview">{plant.preview}</div>
                  <div className="plantilla-info">
                    <span className="plantilla-name">{plant.nombre}</span>
                    <span className="plantilla-desc">{plant.descripcion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="action-buttons">
            {modoDemo ? (
              <button 
                className="btn-action btn-download"
                onClick={descargarEtiqueta}
                disabled={!texto || error}
              >
                <span>📥</span> Descargar
              </button>
            ) : (
              <button 
                className="btn-action btn-save"
                onClick={guardar}
                disabled={!texto || error}
              >
                <span>💾</span> Guardar
              </button>
            )}
          </div>
        </div>

        {/* Panel derecho - Preview */}
        <div className="preview-panel">
          <div className="preview-header">
            <h3>Vista Previa</h3>
            {plantillaSeleccionada && (
              <span className="preview-badge">{plantillaSeleccionada.nombre}</span>
            )}
          </div>

          {error && (
            <div className="error-card">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="preview-canvas-container">
            {!texto ? (
              <div className="preview-empty">
                <div className="empty-icon">📊</div>
                <p>Ingresa contenido para ver la vista previa</p>
              </div>
            ) : (
              <div className="canvas-wrapper">
                {tipo === "QR" ? (
                  <canvas ref={qrRef}></canvas>
                ) : (
                  <canvas ref={barcodeRef}></canvas>
                )}
              </div>
            )}
          </div>

          {texto && !error && (
            <div className="preview-info">
              <div className="info-item">
                <span className="info-label">Tipo:</span>
                <span className="info-value">{tipoSeleccionado.nombre}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Plantilla:</span>
                <span className="info-value">{plantillaSeleccionada.nombre}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Contenido:</span>
                <span className="info-value">{texto}</span>
              </div>
              {descripcion && (
                <div className="info-item">
                  <span className="info-label">Descripción:</span>
                  <span className="info-value">{descripcion}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerarEtiquetas;