import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = ({ cart, updateCart }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const orderData = {
      customerName,
      customerEmail,
      productos: cart.map((item) => ({
        id: item.id,
        name: item.name,
        flavor: item.flavor,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post("http://localhost:8080/api/ordenes", orderData);

      if (response.status === 201) {
        alert("Compra realizada con éxito. ¡Gracias por tu compra!");

        // Limpiar carrito después de la compra
        updateCart([]);

        // Redirigir al home
        navigate("/");
      }
    } catch (error) {
      alert("Hubo un problema con la compra. Intenta nuevamente.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Finalizar Compra</h2>

      {/* Resumen del Pedido */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Resumen del Pedido</h5>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item) => (
                <li key={`${item.id}-${item.flavor}`} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.name} - {item.flavor} (x{item.quantity})
                  <span className="fw-bold">${item.price * item.quantity}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between fw-bold">
                Total a pagar: <span>${total}</span>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Formulario de Datos del Cliente */}
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Nombre Completo:</label>
          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            className="form-control"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Confirmar Compra</button>
      </form>
    </div>
  );
}
