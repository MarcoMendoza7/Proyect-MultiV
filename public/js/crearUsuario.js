const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'UsuarioRegistro'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

// Ruta para registrar usuario
app.post('/registrar-usuario', (req, res) => {
    const { nombre, apellidos, domicilio, telefono, correo, password, plataforma } = req.body;

    // Determinar en qué tabla insertar según la plataforma
    let tablaGeneral = '';
    let tablaEspecifica = '';

    if (plataforma.startsWith('spotify')) {
        tablaGeneral = 'spotify_general';
        tablaEspecifica = req.body.plataforma.replace(" ", "_").toLowerCase(); // spotify_v3
    } else if (plataforma.startsWith('max')) {
        tablaGeneral = 'max_general';
        tablaEspecifica = req.body.plataforma.replace(" ", "_").toLowerCase(); // max_v1
    } else if (plataforma.startsWith('disney')) {
        tablaGeneral = 'disney_general';
        tablaEspecifica = req.body.plataforma.replace(" ", "_").toLowerCase(); // disney_v1
    } else {
        return res.status(400).send('Plataforma inválida');
    }

    // Crear objeto de usuario
    const usuario = { nombre, apellidos, domicilio, telefono, correo, password };

    // Insertar en tabla general
    db.query(`INSERT INTO ${tablaGeneral} SET ?`, usuario, (err, resultGeneral) => {
        if (err) return res.status(500).send('Error al insertar en tabla general');

        // Insertar en tabla específica
        db.query(`INSERT INTO ${tablaEspecifica} SET ?`, usuario, (err, resultEspecifica) => {
            if (err) return res.status(500).send('Error al insertar en tabla específica');

            res.send('Usuario registrado correctamente');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
