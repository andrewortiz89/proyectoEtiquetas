// backend/models/Etiqueta.js
import db from "../db.js";

/**
 * Modelo: operaciones sobre la tabla etiquetas.
 * Usamos Promises para facilidad con async/await.
 */

export const crearEtiquetaBD = (payload) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO etiquetas (texto, tipo, imagen_base64, creado_en) VALUES (?, ?, ?, NOW())`;
    db.query(sql, [payload.texto, payload.tipo || "CODE128", payload.imagen_base64 || null], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...payload });
    });
  });
};

export const listarEtiquetasBD = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM etiquetas ORDER BY creado_en DESC";
    db.query(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const obtenerEtiquetaBD = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM etiquetas WHERE id = ?";
    db.query(sql, [id], (err, rows) => {
      if (err) return reject(err);
      resolve(rows[0]);
    });
  });
};

export const actualizarEtiquetaBD = (id, payload) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE etiquetas SET texto = ?, tipo = ?, imagen_base64 = ?, actualizado_en = NOW() WHERE id = ?`;
    db.query(sql, [payload.texto, payload.tipo || "CODE128", payload.imagen_base64 || null, id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

export const eliminarEtiquetaBD = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM etiquetas WHERE id = ?`;
    db.query(sql, [id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};
