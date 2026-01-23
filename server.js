const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); // Importante para que el navegador permita la conexión
app.use(express.json());

// Servir archivos estáticos (HTML, JS, CSS) desde la raíz
app.use(express.static(__dirname));
// Servir las imágenes
app.use('/src', express.static(path.join(__dirname, 'src')));

const rutaJson = path.join(__dirname, 'productos.json');

// --- NUEVO: Verificar o crear el archivo JSON al iniciar ---
if (!fs.existsSync(rutaJson)) {
  fs.writeFileSync(rutaJson, '[]');
}

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  try {
    const contenido = fs.readFileSync(rutaJson, 'utf-8');
    res.json(JSON.parse(contenido));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al leer los productos" });
  }
});

// ... (aquí van tus rutas POST y DELETE que ya teníamos)

app.listen(3000, () => console.log('Servidor activo en http://localhost:3000'));