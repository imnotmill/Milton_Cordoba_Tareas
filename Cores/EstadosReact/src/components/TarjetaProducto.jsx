import { useState } from "react";
import styles from "../css/TarjetaProducto.module.css";

const TarjetaProducto = ({ nombreProducto, precio, descripcion, cantidad }) => {
  
  const [stock, setStock] = useState(Number(cantidad) || 0);

  const handleComprar = () => {
    setStock(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className={styles.tarjeta}>
      <h2>{nombreProducto}</h2>
      <p className={styles.precio}>${precio}</p>
      <p className={styles.descripcion}>{descripcion}</p>
      

      {stock > 0 ? (
        <p className={styles.enStock}>En Stock: {stock}</p>
      ) : (
        <p className={styles.agotado}>Agotado</p>
      )}

      <button
        className={styles.botonComprar}
        onClick={handleComprar}
        disabled={stock === 0}
      >
        Comprar
      </button>
    </div>
  );
};

export default TarjetaProducto;
