import { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProductosPage } from './components/ProductosPage';
import { CarritoPage } from './components/CarritoPage';
import { CheckoutPage } from './components/CheckoutPage';

export const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, flavor, quantity) => {
    if (!flavor || quantity < 1) return;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === producto.id && item.flavor === flavor
      );

      if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Si es un nuevo producto, agregarlo al carrito
        return [...prevCart, { ...producto, flavor, quantity }];
      }
    });
  };
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/productos"
          element={<ProductosPage addToCart={addToCart} />}
        />
        <Route
          path="/carrito"
          element={<CarritoPage cart={cart} updateCart={setCart} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} updateCart={setCart} />}
        />
      </Routes>
    </>
  );
};
