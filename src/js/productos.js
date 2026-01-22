const controladorProductos = new ProductosController();
const contenedor = document.getElementById('contenedorProductos');

async function mostrarProductos() {
  if (controladorProductos.productos.length === 0) {
    await controladorProductos.cargarDesdeJSON();
  }

  contenedor.innerHTML = '';

  controladorProductos.obtenerTodos().forEach(producto => {
    const articulo = document.createElement('article');
    articulo.className = 'col-md-4 mb-4';

    articulo.innerHTML = `
      <div class="card h-100">
        <img 
  src="${producto.imagen || 'src/img/sin-imagen.png'}"
  class="card-img-top"
  alt="${producto.nombre}"
>
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <ul class="list-unstyled">
            <li><strong>Tipo:</strong> ${producto.tipo}</li>
            <li><strong>Género:</strong> ${producto.genero}</li>
            <li><strong>Deporte:</strong> ${producto.deporte}</li>
            <li><strong>Precio:</strong> $${producto.precio}</li>
          </ul>
        </div>
      </div>
    `;

    contenedor.appendChild(articulo);
  });
}

mostrarProductos();
