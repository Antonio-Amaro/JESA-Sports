class ProductosController {
  constructor() {
    const almacenado = localStorage.getItem('productos');
    if (almacenado) {
      this.productos = JSON.parse(almacenado);
    } else {
      this.productos = [];
      // Cargar productos por defecto desde JSON en /data
      this.cargarDesdeJSON();
    }
  }

  async cargarDesdeJSON() {
    try {
      const response = await fetch('data/productos.json'); // ruta ajustada
      if (!response.ok) throw new Error('No se pudo cargar productos.json');
      const data = await response.json();
      this.productos = data;
      this.guardar();
    } catch (error) {
      console.error(error);
    }
  }

  agregarProducto({nombre, tipo, genero, descripcion, precio, deporte}) {
    const id = Date.now();
    const producto = {id, nombre, tipo, genero, descripcion, precio, deporte};
    this.productos.push(producto);
    this.guardar();
  }

  guardar() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  obtenerTodos() {
    return this.productos;
  }

  importarProductos(arregloJson) {
    this.productos = arregloJson;
    this.guardar();
  }

  exportarProductos() {
    return JSON.stringify(this.productos, null, 2);
  }
}
