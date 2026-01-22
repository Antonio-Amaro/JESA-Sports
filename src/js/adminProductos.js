const productosController = new ProductosController();
const form = document.getElementById('nuevoProductoFormulario');
const mensaje = document.getElementById('mensaje');

const imagenInput = document.getElementById('imagenProducto');
const preview = document.getElementById('previewImagen');

// Preview imagen
imagenInput.addEventListener('input', () => {
  if (imagenInput.value) {
    preview.src = imagenInput.value;
    preview.classList.remove('d-none');
  } else {
    preview.classList.add('d-none');
  }
});

// Agregar producto
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const producto = {
    nombre: nombreProducto.value.trim(),
    tipo: tipoProducto.value,
    genero: generoProducto.value,
    descripcion: descripcionProducto.value.trim(),
    precio: parseFloat(precioProducto.value),
    deporte: deporteProducto.value,
    imagen: imagenProducto.value.trim()
  };

  if (Object.values(producto).some(v => !v || v === '')) {
    mensaje.innerHTML = `<div class="alert alert-danger">
      ❌ Faltan campos por rellenar
    </div>`;
    return;
  }

  productosController.agregarProducto(producto);
  form.reset();
  preview.classList.add('d-none');

  mensaje.innerHTML = `<div class="alert alert-success">
    ✅ Producto añadido correctamente
  </div>`;
});

// Exportar productos
document.getElementById('exportarProductos').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," +
    encodeURIComponent(productosController.exportarProductos());

  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", "productos.json");
  a.click();
});

// Importar productos
document.getElementById('importarArchivo').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      productosController.importarProductos(JSON.parse(e.target.result));
      mensaje.innerHTML = `<div class="alert alert-success">
        Productos importados correctamente
      </div>`;
    } catch {
      mensaje.innerHTML = `<div class="alert alert-danger">
        Error al importar JSON
      </div>`;
    }
  };
  reader.readAsText(file);
});
