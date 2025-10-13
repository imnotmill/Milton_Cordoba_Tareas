import styles from "../css/TarjetaProducto.module.css";

function TarjetaProducto({ nombreProducto, precio, descripcion, enStock }) {
  return (
    <div className={styles.tarjetaProducto}>
      <h2>{nombreProducto}</h2>
      <p>${precio}</p>
      <p>{descripcion}</p>
      <p className={enStock ? styles.enStock : styles.agotado}>
        {enStock ? "En Stock" : "Agotado"}
      </p>
    </div>
  );
}

export default TarjetaProducto;