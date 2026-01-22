class ProductosController {
  constructor() {
    const almacenado = localStorage.getItem('productos');
    this.productos = almacenado ? JSON.parse(almacenado) : [];
  }

  async cargarDesdeJSON() {
    try {
      const response = await fetch('src/data/productos.json');
      const data = await response.json();
      this.productos = data;
      this.guardar();
    } catch (error) {
      console.error(error);
    }
  }

  agregarProducto({nombre, tipo, genero, descripcion, precio, deporte, imagen}) {
    const producto = {
      id: Date.now(),
      nombre,
      tipo,
      genero,
      descripcion,
      precio,
      deporte,
      imagen
    };
    this.productos.push(producto);
    this.guardar();
  }

  obtenerTodos() {
    return this.productos;
  }

  guardar() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  importarProductos(json) {
    this.productos = json;
    this.guardar();
  }

  exportarProductos() {
    return JSON.stringify(this.productos, null, 2);
  }
}
