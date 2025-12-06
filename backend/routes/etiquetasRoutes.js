import express from "express";
import {
  crearEtiqueta,
  listarEtiquetas,
  obtenerEtiqueta,
  actualizarEtiqueta,
  eliminarEtiqueta
} from "../controllers/etiquetasController.js";

const router = express.Router();

router.post("/", crearEtiqueta);
router.get("/", listarEtiquetas);
router.get("/:id", obtenerEtiqueta);
router.put("/:id", actualizarEtiqueta);     // 🔵 ACTUALIZAR
router.delete("/:id", eliminarEtiqueta);    // 🔴 ELIMINAR

// PUT actualizar etiqueta
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { texto, tipo } = req.body;

  if (!texto || !tipo) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos para actualizar"
    });
  }

  const sql = "UPDATE etiquetas SET texto = ?, tipo = ? WHERE id = ?";
  db.query(sql, [texto, tipo, id], (err, result) => {
    if (err) {
      console.error("Error actualizando etiqueta:", err);
      return res.status(500).json({
        success: false,
        message: "Error en actualización",
        error: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Etiqueta no encontrada"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Etiqueta actualizada correctamente"
    });
  });
});
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM etiquetas WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error obteniendo etiqueta",
        error: err
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Etiqueta no encontrada"
      });
    }
    res.json({ success: true, etiqueta: result[0] });
  });
});
import QRCode from "qrcode";

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { includeQR } = req.query; // ← si viene ?includeQR=true

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM etiquetas WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Etiqueta no encontrada" });
    }

    let etiqueta = rows[0];

    if (includeQR === "true") {
      etiqueta.qr = await QRCode.toDataURL(etiqueta.texto);
    }

    return res.json(etiqueta);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error consultando etiqueta",
      error: error.message,
    });
  }
});




export default router;



