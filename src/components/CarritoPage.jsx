import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CarritoPage = ({ cart, updateCart }) => {
  const navigate = useNavigate();

  const handleRemove = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, flavor, quantity) => {
    updateCart(
      cart.map((item) =>
        item.id === id && item.flavor === flavor ? { ...item, quantity } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // const getTotal = () => {
  //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="alert alert-warning text-center">
          No hay productos en el carrito.
        </p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">
                    {item.name} - {item.flavor}
                  </h5>
                  <p className="card-text fw-bold">${item.price} c/u</p>
                </div>

                <label>
                  Cantidad:
                  <input
                    type="number"
                    className="form-control d-inline-block w-25 ms-2"
                    min="1"
                    max={item.stock[item.flavor] || 1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        item.flavor,
                        parseInt(e.target.value)
                      )
                    }
                  />
                </label>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleRemove(item.id, item.flavor)}
                >
                  ❌ Eliminar
                </button>
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <>
              <h3 className="mt-3">Total a pagar: ${total}</h3>
              <button
                className="mt-4 p-2 bg-green-600 text-white rounded"
                onClick={() => navigate('/checkout')}
              >
                {' '}
                ✅ Finalizar Compra
              </button>
            </>
          )}

          {/* Total y botones */}
          {/* <div className="text-end">
            <h4 className="fw-bold">Total: ${getTotal()}</h4>
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate('/productos')}
            >
              🔄 Seguir Comprando
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate('/checkout')}
            >
              Finalizar Compra
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};
