const controladorProductos = new ProductosController();
const carrito = new CarritoController();
const contenedor = document.getElementById('contenedorProductos');

async function mostrarProductos() {
  // 1. Cargamos los productos desde el servidor
  await controladorProductos.cargarProductos();
  
  const listaProductos = controladorProductos.obtenerTodos();
  contenedor.innerHTML = '';

  listaProductos.forEach(producto => {
    const articulo = document.createElement('article');
    articulo.className = 'col-md-4 mb-4';

    // Importante: La URL de la imagen ahora apunta a nuestro servidor local
    const urlImagen = `http://localhost:3000/${producto.imagen}`;

    articulo.innerHTML = `
      <div class="card h-100">
        <img src="${urlImagen}" class="card-img-top" alt="${producto.nombre}" 
             onerror="this.src='src/img/placeholder.png'">
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
    });

    contenedor.appendChild(articulo);
  });
}

// Inicializar
mostrarProductos();
actualizarContador();