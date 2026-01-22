const productosController = new ProductosController();

const form = document.getElementById('nuevoProductoFormulario');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const producto = {
    nombre: document.getElementById('nombreProducto').value,
    tipo: document.getElementById('tipoProducto').value,
    genero: document.getElementById('generoProducto').value,
    descripcion: document.getElementById('descripcionProducto').value,
    precio: parseFloat(document.getElementById('precioProducto').value),
    deporte: document.getElementById('deporteProducto').value
  };

  productosController.agregarProducto(producto);
  form.reset();
  alert('Producto agregado');
});

// Exportar productos
document.getElementById('exportarProductos').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(productosController.exportarProductos());
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "productos.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});

// Importar productos desde archivo JSON
document.getElementById('importarArchivo').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      productosController.importarProductos(json);
      document.getElementById('mensaje').innerText = 'Productos importados correctamente.';
    } catch(err) {
      document.getElementById('mensaje').innerText = 'Error al importar JSON';
    }
  };
  reader.readAsText(file);
});
