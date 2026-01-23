const carrito = new CarritoController();
const lista = document.getElementById('listaCarrito');
const total = document.getElementById('total');

function render() {
  lista.innerHTML = '';
  const items = carrito.obtenerCarrito();

  if (items.length === 0) {
    lista.innerHTML = '<p>Tu carrito está vacío.</p>';
  }

  items.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card mb-3 p-3 carrito-item d-flex flex-column flex-md-row align-items-start gap-2';

    div.innerHTML = `
      <img src="${p.imagen || 'src/img/sin-imagen.png'}" alt="${p.nombre}">
      <div class="d-flex flex-column flex-md-row gap-1 align-items-start justify-content-between w-100">
        <h5>${p.nombre}</h5>
        <div class="info-item d-flex flex-md-column">
          <p>Precio unitario:</p>
          <span>$${p.precio}</span>
        </div>
        <div class="info-item d-flex flex-md-column">
          <p>Cantidad:</p>
          <input type="number" min="1" value="${p.cantidad}" style="width:60px">
        </div>
        <div class="info-item d-flex flex-md-column">
          <p>Subtotal:</p>
          <span>$${(p.precio * p.cantidad).toFixed(2)}</span>
        </div>
        <button class="btn btn-danger">x</button>
      </div>
    `;

    div.querySelector('input').addEventListener('change', e => {
      const cantidad = Number(e.target.value);
      if (cantidad > 0) {
        carrito.cambiarCantidad(p.id, cantidad);
        render();
      }
    });

    div.querySelector('button').addEventListener('click', () => {
      carrito.eliminarProducto(p.id);
      render();
    });

    lista.appendChild(div);
  });

  total.textContent = carrito.obtenerTotal().toFixed(2);
}

render();

document.getElementById('comprar').addEventListener('click', () => {
  if (carrito.obtenerCarrito().length === 0) {
    alert('El carrito está vacío');
    return;
  }

  alert('¡Compra realizada!');
  carrito.vaciar();
  render();
});
