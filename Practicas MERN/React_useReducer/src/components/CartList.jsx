import styles from "../css/cartlist.module.css";
import CartItem from "./CartItem";

const CartList = ({ items, onRemove, onUpdate }) => (
  <div className={styles.cartContainer}>
    {items.map(product => (
      <CartItem
        key={product.id}
        info={product}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ))}
  </div>
);

export default CartList;
