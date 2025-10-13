import TarjetaProducto from "./TarjetaProducto";
import "../App.css";

const Contenedores = () => {
  return (
    <div className="contenedor-productos">
      <TarjetaProducto
        nombreProducto="Laptop"
        precio={1500}
        descripcion="Una potente laptop para trabajar y jugar."
        cantidad={10}
      />
      <TarjetaProducto
        nombreProducto="Smartphone"
        precio={800}
        descripcion="Un smartphone de última generación."
        cantidad={10}
      />
      <TarjetaProducto
        nombreProducto="Auriculares"
        precio={200}
        descripcion="Auriculares con cancelación de ruido."
        cantidad={10}
      />
      <TarjetaProducto
        nombreProducto="Monitor"
        precio={300}
        descripcion="Monitor 4K para una experiencia visual increíble."
        cantidad={10}
      />
    </div>
  );
};

export default Contenedores;
