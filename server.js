// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path'); // Asegúrate de importar el módulo 'path'

const app = express();
const db = new sqlite3.Database('./dudas_y_propuestas.db');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Sirve archivos estáticos

// Ruta para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Asegúrate de que la ruta sea correcta
});

// Ruta para insertar datos
app.post('/dudas', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    const sql = 'INSERT INTO dudas (nombre, email, mensaje) VALUES (?, ?, ?)';

    db.run(sql, [nombre, email, mensaje], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id: this.lastID });
    });
});

// Cerrar la base de datos al cerrar el servidor
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error cerrando la base de datos:', err.message);
        } else {
            console.log('Base de datos cerrada.');
        }
    });
    process.exit(0);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
