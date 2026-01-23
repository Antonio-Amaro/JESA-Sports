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
        <img src="${producto.imagen || 'src/img/camisaAzul.png'}"
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

      // Configuración de Toast ultra-visible
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        // Esto asegura que la alerta se mueva con el scroll
        didOpen: (toast) => {
          toast.style.zIndex = '99999'; // Prioridad máxima sobre Navbars
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: '¡Producto añadido!',
        text: `${producto.nombre} ya está listo.`,
        iconColor: '#10b981',
        background: '#ffffff',
        // Añadimos una sombra más fuerte para que resalte en el scroll
        customClass: {
          popup: 'shadow-lg border-2 border-emerald-500'
        }
      });
    });

    contenedor.appendChild(articulo);
  });

  actualizarContador();
}

mostrarProductos();
