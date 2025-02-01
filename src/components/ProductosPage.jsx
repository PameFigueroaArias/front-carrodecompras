import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductosPage = ({ addToCart }) => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get('http://localhost:8080/api/productos')
      .then((response) => setProductos(response.data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);


  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Productos</h2>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card p-3">
              <h5 className="card-title">{producto.name}</h5>
              <p>{producto.description}</p>
              <p className="text-primary">${producto.price}</p>

              <label>Sabor:</label>
              <select className="border p-1 rounded" onChange={(e) => addToCart(producto, e.target.value)}>
            <option value="">Seleccionar sabor</option>
            {Object.entries(producto.stock).map(([sabor, cantidad]) => (
              <option key={sabor} value={sabor} disabled={cantidad === 0}>
                {sabor} ({cantidad} disponibles)
              </option>
            ))}
          </select>

              {/* <label>Cantidad:</label>
              <input
                type="number"
                className="form-control mb-3"
                min="1"
                max={producto.stock[selectedFlavors[producto.id]] || 1}
                value={selectedQuantities[producto.id] || 1}
                onChange={(e) =>
                  handleQuantityChange(producto.id, Number(e.target.value))
                }
              /> */}

              {/* <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(producto)}
              >
                Agregar al Carrito
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
