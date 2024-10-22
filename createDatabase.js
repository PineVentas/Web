// createDatabase.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dudas_y_propuestas.db');

// Crear la tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS dudas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT,
        mensaje TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creando la tabla:', err.message);
        } else {
            console.log('Tabla creada o ya existe.');
        }
    });
});

// Cerrar la base de datos
db.close((err) => {
    if (err) {
        console.error('Error cerrando la base de datos:', err.message);
    } else {
        console.log('Base de datos cerrada.');
    }
});
