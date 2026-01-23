const productosController = new ProductosController();
const form = document.getElementById('nuevoProductoFormulario');
const imagenInput = document.getElementById('imagenProducto');
const preview = document.getElementById('previewImagen');
const listaAdmin = document.getElementById('listaProductosAdmin');

// Preview de imagen seleccionada
imagenInput.addEventListener('change', () => {
  const file = imagenInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
});

// Guardar producto enviando el archivo al servidor
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. Crear el objeto con los datos de texto
  const productoData = {
    nombre: document.getElementById('nombreProducto').value.trim(),
    tipo: document.getElementById('tipoProducto').value,
    descripcion: document.getElementById('descripcionProducto').value.trim(),
    precio: parseFloat(document.getElementById('precioProducto').value),
    deporte: document.getElementById('deporteProducto').value,
    genero: "unisex" // Valor por defecto o puedes añadir el select si lo deseas
  };

  // 2. Usar FormData para enviar el archivo
  const formData = new FormData();
  formData.append('imagen', imagenInput.files[0]); // El archivo real
  formData.append('datos', JSON.stringify(productoData)); // Los datos en texto

  try {
    const response = await fetch('http://localhost:3000/productos', {
      method: 'POST',
      body: formData // No enviamos JSON, enviamos el formulario completo
    });

    if (response.ok) {
      alert("¡Producto guardado con éxito!");
      form.reset();
      preview.classList.add('hidden');
      renderizarProductosAdmin(); // Actualizar lista
    }
  } catch (err) {
    console.error("Error al guardar:", err);
  }
});

async function renderizarProductosAdmin() {
  const lista = document.getElementById('listaProductosAdmin');
  const contador = document.getElementById('productCount');
  
  // 1. Limpiar y mostrar "Cargando..."
  lista.innerHTML = '<p class="text-gray-500 italic">Cargando catálogo...</p>';

  // 2. Esperar los datos reales
  const productos = await productosController.cargarProductos();
  
  if (!productos || productos.length === 0) {
    lista.innerHTML = '<p class="text-red-400">No hay productos disponibles.</p>';
    if (contador) contador.innerText = "0 Productos";
    return;
  }

  if (contador) contador.innerText = `${productos.length} Productos`;
  lista.innerHTML = ''; // Limpiar el mensaje de carga

  // 3. Dibujar las tarjetas
  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = "flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-emerald_custom transition-all group";
    
    // Usamos la URL completa para la imagen
    const rutaImg = `http://localhost:3000/${p.imagen}`;

    card.innerHTML = `
      <div class="flex items-center gap-4">
        <img src="${rutaImg}" alt="${p.nombre}" 
             class="w-16 h-16 object-cover rounded-xl shadow-sm bg-gray-100"
             onerror="this.src='https://via.placeholder.com/150?text=No+Imagen'">
        <div>
          <h4 class="font-bold text-dark group-hover:text-emerald_custom transition">${p.nombre}</h4>
          <p class="text-sm text-gray-500">$${p.precio} — <span class="capitalize text-xs font-semibold text-emerald_custom">${p.deporte}</span></p>
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="prepararEdicion(${p.id}, '${p.nombre}', ${p.precio}, '${p.deporte}')" 
                class="px-3 py-1 text-sm font-medium text-gray-500 hover:text-yellow-600 transition border border-transparent hover:border-yellow-100 rounded-lg">
          Editar
        </button>
        <button onclick="borrarProducto(${p.id})" 
                class="px-3 py-1 text-sm font-medium text-gray-500 hover:text-red-600 transition border border-transparent hover:border-red-100 rounded-lg">
          Borrar
        </button>
      </div>
    `;
    lista.appendChild(card);
  });
}

window.borrarProducto = async (id) => {
  if(confirm("¿Seguro que quieres eliminar este producto?")) {
    await productosController.eliminarProducto(id);
    renderizarProductosAdmin();
  }
}

// Carga inicial
renderizarProductosAdmin();

// Esta función debe ejecutarse apenas cargue el script
async function inicializarPanel() {
  console.log("Iniciando carga de catálogo...");
  await renderizarProductosAdmin();
}

inicializarPanel();