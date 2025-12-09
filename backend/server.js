// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import etiquetasRoutes from "./routes/etiquetasRoutes.js";
import db from "./db.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configuración de CORS segura
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging básico
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    environment: process.env.NODE_ENV,
    database: "connected" 
  });
});

// Rutas de etiquetas
app.use("/api/etiquetas", etiquetasRoutes);

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Email y contraseña son requeridos" 
    });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?";
  
  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error("Error en login:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Error en el inicio de sesión" 
      });
    }
    
    if (data.length > 0) {
      // En producción, deberías usar JWT tokens
      const user = data[0];
      return res.status(200).json({ 
        success: true, 
        message: "Bienvenido a la plataforma",
        user: {
          id: user.id,
          email: user.email
          // NO enviar contraseña
        }
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "Usuario o contraseña incorrectos" 
      });
    }
  });
});

// Register
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Email y contraseña son requeridos" 
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Formato de email inválido" 
    });
  }

  // Validar longitud de contraseña
  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: "La contraseña debe tener al menos 6 caracteres" 
    });
  }

  // Verificar si el usuario ya existe
  const dbcheck = "SELECT * FROM usuarios WHERE email = ?";
  
  db.query(dbcheck, [email], (err, data) => {
    if (err) {
      console.error("Error verificando usuario:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Error en verificación" 
      });
    }
    
    if (data.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "El correo ya existe" 
      });
    }

    // Insertar nuevo usuario
    // NOTA: En producción deberías hashear la contraseña con bcrypt
    const dbinsert = "INSERT INTO usuarios (email, contraseña) VALUES (?, ?)";
    
    db.query(dbinsert, [email, password], (errInsert, result) => {
      if (errInsert) {
        console.error("Error creando usuario:", errInsert);
        return res.status(500).json({ 
          success: false, 
          message: "Error al crear usuario" 
        });
      }
      
      return res.status(201).json({ 
        success: true, 
        message: "Usuario creado con éxito",
        userId: result.insertId
      });
    });
  });
});

// ==========================================
// MANEJO DE ERRORES 404
// ==========================================
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Ruta no encontrada" 
  });
});

// ==========================================
// MANEJO DE ERRORES GLOBAL
// ==========================================
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({ 
    success: false, 
    message: "Error interno del servidor" 
  });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;
// Ruta raíz
app.get("/", (req, res) => {
  res.json({ 
    success: true,
    message: "API de Etiquetas Express funcionando correctamente",
    endpoints: {
      health: "/health",
      login: "/login",
      register: "/register",
      etiquetas: "/api/etiquetas"
    }
  });
});
app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Base de datos: ${process.env.MYSQL_ADDON_DB}`);
  console.log("=================================");
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  db.end(() => {
    console.log('Pool de MySQL cerrado');
    process.exit(0);
  });
});