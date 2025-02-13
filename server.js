require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Datos de usuarios (simulando una base de datos)
const users = [
  { id: 1, email: "test@example.com", password: bcrypt.hashSync("123456", 10) },
  { id: 2, email: "admin@example.com", password: bcrypt.hashSync("00000", 10) } 
];


// Endpoint de login (genera el token)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Verificar la contraseña
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Generar el token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Responder con el token
  res.json({ token });
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  // Verificar el token
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
};

// Endpoint protegido (requiere token)
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Accediste a un recurso protegido", user: req.user });
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));