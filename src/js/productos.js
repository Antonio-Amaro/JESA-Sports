const controladorProductos = new ProductosController();
const carrito = new CarritoController();
const contenedor = document.getElementById('contenedorProductos');
const contadorCarrito = document.getElementById('contadorCarrito');

function actualizarContador() {
  const totalItems = carrito.obtenerCarrito().reduce((acc, p) => acc + p.cantidad, 0);
  contadorCarrito.textContent = totalItems;
}

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
        <img src="${producto.imagen || 'src/img/camisa_gorraRoja.png'}"
             class="card-img-top" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p><strong>$${producto.precio}</strong></p>
          <button class="btn btn-primary mt-auto btn-agregar">
             Añadir al carrito
          </button>
        </div>
      </div>
    `;

    articulo.querySelector('.btn-agregar').addEventListener('click', () => {
      carrito.agregarProducto(producto);
      actualizarContador();
      alert('el producto fue añadido al carrito');
    });

    contenedor.appendChild(articulo);
  });

  actualizarContador();
}

mostrarProductos();
