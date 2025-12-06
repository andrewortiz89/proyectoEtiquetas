// backend/migrate.js
import db from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const migraciones = [
  {
    nombre: "Agregar columna plantilla",
    // QUITÉ 'IF NOT EXISTS'
    sql: `
      ALTER TABLE etiquetas 
      ADD COLUMN plantilla VARCHAR(50) DEFAULT 'clasica' AFTER tipo
    `,
  },
  {
    nombre: "Agregar columna descripcion",
    // QUITÉ 'IF NOT EXISTS'
    sql: `
      ALTER TABLE etiquetas 
      ADD COLUMN descripcion TEXT AFTER plantilla
    `,
  },
];

const ejecutarMigraciones = async () => {
  console.log("🚀 Iniciando migraciones...\n");

  for (const migracion of migraciones) {
    try {
      console.log(`⏳ Ejecutando: ${migracion.nombre}...`);

      await new Promise((resolve, reject) => {
        db.query(migracion.sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      console.log(`✅ ${migracion.nombre} - Completada\n`);
    } catch (error) {
      // AQUÍ ESTÁ TU MAGIA: Si la columna ya existe, entra aquí
      if (error.code === "ER_DUP_FIELDNAME" || error.errno === 1060) {
        console.log(`ℹ️  ${migracion.nombre} - Ya existe (omitiendo)\n`);
      } else {
        console.error(`❌ Error en ${migracion.nombre}:`, error.message);
        process.exit(1);
      }
    }
  }

  // Verificar estructura final
  console.log("📋 Verificando estructura final...");

  db.query("DESCRIBE etiquetas", (err, results) => {
    if (err) {
      console.error("❌ Error verificando estructura:", err);
      process.exit(1);
    }

    console.log("\n✅ Estructura actual de la tabla 'etiquetas':");
    console.table(results);

    console.log("\n🎉 Migraciones completadas exitosamente!");
    process.exit(0);
  });
};

// Ejecutar
ejecutarMigraciones();
