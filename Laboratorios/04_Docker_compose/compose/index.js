const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const PORT = 3000;
const HOST = '0.0.0.0'; // Permite que la app escuche llamadas fuera del contenedor

// Crear un Pool de conexiones en lugar de abrir/cerrar por cada petición
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppass',
  database: process.env.DB_NAME || 'appdb',
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/', async (req, res) => {
  try {
    // Usamos el pool para ejecutar la consulta
    await pool.query('SELECT 1');
    res.send('Hola! La app Node se conecto a MySQL correctamente.');
  } catch (err) {
    console.error('Error de BD:', err);
    res.status(500).send('No pude conectar a MySQL: ' + err.message);
  }
});

// Incluir HOST ('0.0.0.0') en listen
app.listen(PORT, HOST, () => console.log(`Server en http://localhost:${PORT}`));