import styles from "../css/productcard.module.css";

const ProductCard = ({ info, onAdd }) => (
  <div className={styles.card}>
    <img src={info.img} alt={info.name} />
    <h3>{info.name}</h3>
    <p>${info.price}</p>
    <p>{info.desc}</p>
    <p>En Stock: {info.stock}</p>

    <button onClick={onAdd}>Comprar</button>
  </div>
);

export default ProductCard;
