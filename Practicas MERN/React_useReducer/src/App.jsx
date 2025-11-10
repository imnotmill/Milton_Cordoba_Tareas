import { useReducer, useState } from "react";
import { products } from "./data.js";
import ProductList from "./components/ProductList.jsx";
import CartList from "./components/CartList.jsx";
import { cartReducer, ACTIONS } from "./reducer/cartReducer.js";

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0 });

  const addToCart = (product) =>
    dispatch({ type: ACTIONS.ADD_PRODUCT, payload: product });

  const removeFromCart = (id) =>
    dispatch({ type: ACTIONS.REMOVE_PRODUCT, payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="app">

      <h1>Super Shopping Cart 🛒</h1>

      <h2>Productos Disponibles</h2>
      <ProductList items={products} onAdd={addToCart} />

      <h2>Carrito de Compras</h2>
      <CartList items={cart} onRemove={removeFromCart} onUpdate={updateQuantity} />

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default App;