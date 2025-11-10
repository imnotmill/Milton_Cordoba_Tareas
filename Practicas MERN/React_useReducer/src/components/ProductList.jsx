import styles from "../css/productlist.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ items, onAdd }) => (
  <div className={styles.productsContainer}>
    {items.map(product => (
      <ProductCard key={product.id} info={product} onAdd={() => onAdd(product)} />
    ))}
  </div>
);

export default ProductList;
