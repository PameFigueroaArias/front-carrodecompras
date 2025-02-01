#  Carrito de compras
Proyecto desarrollado con React, utiliza Axios para conectar con backend.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/PameFigueroaArias/front-carrodecompras.git
   ```
   
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```

# Características principales
1. Selección de productos:
- Muestra lista de productos disponibles.
- Permite seleccionar sabor.

2. Carrito de Compras
- Presenta los productos seleccionados con sabor.
- Permite seleccionar cantidad mediante un contador.
- Permite eliminar producto.
- Permite navegar a la selección de productos para seguir comprando.
- Mediante el botón Finalizar Compra dirije al Checkout.

3. CheckoutPage
- Visualiza el precio total de productos.
- Permite ingresar nombre y correo.
- Se guardan los datos de la orden seleccionada.
- Muestra una descripción con el resumen del pedido.

4. Navbar
- Barra de navegación con enlaces a las secciones: E-Commerce, Productos, Carrito.

  
# Tecnologías utilizadas
- Frontend: React con React Router para navegar.
- Hooks: useState para mejorar estados globales, useEffect para traer los datos mediantes axios. 
- Estilos: CSS, Bootstrap.


# Futuras Mejoras
- Pruebas unitarias y de integración.
