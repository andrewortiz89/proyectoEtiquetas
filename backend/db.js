// backend/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Validar que existan las variables de entorno necesarias
const requiredEnvVars = [
  "MYSQL_ADDON_HOST",
  "MYSQL_ADDON_USER",
  "MYSQL_ADDON_PASSWORD",
  "MYSQL_ADDON_DB",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Error: Faltan las siguientes variables de entorno:");
  console.error(missingVars.join(", "));
  process.exit(1);
}

// Configuración de la conexión
const dbConfig = {
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Probar conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error de conexión MySQL:", err.message);
    console.error("Host:", process.env.MYSQL_ADDON_HOST);
    console.error("Database:", process.env.MYSQL_ADDON_DB);
    console.error("User:", process.env.MYSQL_ADDON_USER);
    return;
  }

  console.log("✅ MySQL conectado exitosamente");
  console.log(`📊 Base de datos: ${process.env.MYSQL_ADDON_DB}`);

  // Verificar qué base de datos está conectada
  connection.query("SELECT DATABASE() AS db", (err, result) => {
    if (!err && result[0]) {
      console.log(`🔗 Conectado a: ${result[0].db}`);
    }
    connection.release();
  });
});

// Manejo de errores del pool
pool.on("error", (err) => {
  console.error("❌ Error inesperado en el pool de MySQL:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.error("Se perdió la conexión con la base de datos");
  }
});

export default pool;
