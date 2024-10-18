// app.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas de reservas
const reservasRoutes = require('./routes/reservasRouting');
app.use('/reservas', reservasRoutes);

// Ruta básica para pruebas
app.get('/', (req, res) => {
    res.send('<h1>Hoooola mundo</h1>')
});

// Escuchando en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
