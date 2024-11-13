// importar modulos con require
const express= require("express");
const mysql = require ("mysql");
const cors = require("cors");
const dotenv= require("dotenv");

//configuracion
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//conexion 
const conexion= mysql.createConnection({
    host:process.env.MYSQL_ADDON_HOST,
    database:process.env.MYSQL_ADDON_DB,
    user:process.env.MYSQL_ADDON_USER,
    password:process.env.MYSQL_ADDON_PASSWORD

});

//ruta de login
app.post('/login',(req,res)=>{
    const db= "SELECT * FROM usuarios WHERE email= ? AND contraseña= ?";
    conexion.query(db,[req.body.email,req.body.password],(err, data)=>{
        if (err) return res.status(500).json({ success:false, message:"Error en el inicio de sesiòn"});

        if(data.length > 0){  
            return res.status(200).json ({success: true, message:"Bienvenido a la plataforma"});   
        }else{
        return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos"});
    }
  });
});

//ruta de register
app.post ('/register',(req,res)=>{
    const{email,password}=req.body;
    //verificacion de correo
    const dbcheck= "SELECT * FROM usuarios WHERE email =?";
    conexion.query(dbcheck,[email],(err,data)=>{
        if (data.length> 0){
            return res.status(400).json({success:false,message:"El correo ya existe"})
        }else{
            //inserción de datos a la base de datos
            const dbinsert="INSERT INTO usuarios (email,contraseña) VALUES (?,?)";
            conexion.query(dbinsert,[email,password],(err,data)=>{
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: "Error al crear usuario" });
                }
                return res.status(200).json({success:true,message:"usuario creado con exito"})
            }
          )
        }
      } 
     )
    }
   )

app.listen(3000,()=> {
    console.log("servidor escuchando...");
})
