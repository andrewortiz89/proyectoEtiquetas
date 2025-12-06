// backend/controllers/etiquetasController.js
import db from "../db.js";

// Crear etiqueta
export const crearEtiqueta = (req, res) => {
  const { texto, tipo, imagen_base64, plantilla, descripcion } = req.body;

  const sql = `
    INSERT INTO etiquetas (texto, tipo, imagen_base64, plantilla, descripcion)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [texto, tipo, imagen_base64, plantilla || 'clasica', descripcion || ''], (err, result) => {
    if (err) {
      console.error("❌ Error creando etiqueta:", err);
      return res.status(500).json({ success: false, message: "Error creando etiqueta" });
    }

    return res.json({ success: true, id: result.insertId });
  });
};

// Listar etiquetas
export const listarEtiquetas = (req, res) => {
  db.query("SELECT * FROM etiquetas ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("❌ Error listando etiquetas:", err);
      return res.status(500).json({ success: false, message: "Error listando etiquetas" });
    }
    res.json(results);
  });
};

// Obtener etiqueta
export const obtenerEtiqueta = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM etiquetas WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Error obteniendo etiqueta:", err);
      return res.status(500).json({ success: false });
    }
    res.json(results[0]);
  });
};

// Actualizar etiqueta
export const actualizarEtiqueta = (req, res) => {
  const { id } = req.params;
  const { texto, tipo, imagen_base64, plantilla, descripcion } = req.body;

  const sql = `
    UPDATE etiquetas
    SET texto = ?, tipo = ?, imagen_base64 = ?, plantilla = ?, descripcion = ?
    WHERE id = ?
  `;

  db.query(sql, [texto, tipo, imagen_base64, plantilla || 'clasica', descripcion || '', id], (err) => {
    if (err) {
      console.error("❌ Error actualizando etiqueta:", err);
      return res.status(500).json({ success: false, message: "Error actualizando etiqueta" });
    }

    res.json({ success: true, message: "Etiqueta actualizada correctamente" });
  });
};

// Eliminar etiqueta
export const eliminarEtiqueta = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM etiquetas WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("❌ Error eliminando etiqueta:", err);
      return res.status(500).json({ success: false, message: "Error eliminando etiqueta" });
    }

    res.json({ success: true, message: "Etiqueta eliminada correctamente" });
  });
};