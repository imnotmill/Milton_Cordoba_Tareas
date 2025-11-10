import styles from "../css/cartitem.module.css";

const CartItem = ({ info, onRemove, onUpdate }) => (
  <div className={styles.cartItem}>
    <span>{info.name}</span>

    <input
      type="number"
      min="1"
      value={info.quantity}
      onChange={e => onUpdate(info.id, Number(e.target.value))}
    />

    <span>${(info.price * info.quantity).toFixed(2)}</span>

    <button onClick={() => onRemove(info.id)}>❌</button>
  </div>
);

export default CartItem;
