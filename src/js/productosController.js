class ProductosController {
  constructor() {
    this.productos = [];
  }

  async cargarProductos() {
    try {
      const respuesta = await fetch('http://localhost:3000/productos');
      if (!respuesta.ok) throw new Error("Error en el servidor");
      
      this.productos = await respuesta.json();
      console.log("Productos cargados:", this.productos); // Debug para ver en consola
      return this.productos;
    } catch (error) {
      console.error("No se pudo conectar con el servidor:", error);
      return [];
    }
  }
  // Dentro de la clase ProductosController
  async eliminarProducto(id) {
    try {
      const respuesta = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE'
      });
      return await respuesta.json();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }

  obtenerTodos() {
    return this.productos;
  }
}