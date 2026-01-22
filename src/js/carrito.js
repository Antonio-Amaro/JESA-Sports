// 1. Obtener datos del LocalStorage (JSON que guardó el compañero)
        let carrito = JSON.parse(localStorage.getItem('jesa_cart')) || [];

        const listaContenedor = document.getElementById('cart-items-list');
        const emptyMsg = document.getElementById('empty-cart-msg');
        const totalTxt = document.getElementById('total-precio');
        const subtotalTxt = document.getElementById('subtotal-precio');
        const contadorTxt = document.getElementById('contador-items');

        // 2. Función para dibujar los productos
        function renderCarrito() {
            listaContenedor.innerHTML = '';

            if (carrito.length === 0) {
                emptyMsg.classList.remove('d-none');
                actualizarPrecios(0);
                contadorTxt.innerText = "0 productos";
                return;
            }

            emptyMsg.classList.add('d-none');

            // Renderizamos cada objeto del JSON
            carrito.forEach((item, index) => {
                const itemHTML = `
                    <div class="cart-item d-flex align-items-center gap-3 py-3 border-bottom">
                        <div class="product-info flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="fw-bold mb-0 text-dark">${item.nombre_producto}</h6>
                                    <small class="text-muted">${item.categoria}</small>
                                </div>
                                <span class="fw-bold text-primary">$${parseFloat(item.precio).toFixed(2)}</span>
                            </div>
                            <div class="mt-2 d-flex justify-content-between align-items-center">
                                <span class="text-xs text-muted small">ID: ${item.id}</span>
                                <span class="btn-remove" onclick="eliminarItem(${index})">Quitar producto</span>
                            </div>
                        </div>
                    </div>
                `;
                listaContenedor.innerHTML += itemHTML;
            });

            const totalCalculado = carrito.reduce((acc, prod) => acc + parseFloat(prod.precio), 0);
            actualizarPrecios(totalCalculado);
            contadorTxt.innerText = `${carrito.length} productos`;
        }

        // 3. Función para eliminar (La que pediste)
        window.eliminarItem = function(index) {
            // Eliminar del array por su posición
            carrito.splice(index, 1);
            
            // Guardar el nuevo estado en el LocalStorage para que el compañero lo vea
            localStorage.setItem('jesa_cart', JSON.stringify(carrito));
            
            // Volver a dibujar
            renderCarrito();
        };

        // 4. Actualizar textos de precio
        function actualizarPrecios(monto) {
            const formatted = `$${monto.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
            totalTxt.innerText = formatted;
            subtotalTxt.innerText = formatted;
        }

        // Ejecutar al cargar la página
        document.addEventListener('DOMContentLoaded', renderCarrito);