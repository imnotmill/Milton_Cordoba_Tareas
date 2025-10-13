import TarjetaProducto from "./TarjetaProducto";
import "../App.css"; // si querés usar App.css para el contenedor

const TP = () => {
  return (
    <div className="contenedor-productos">
      <TarjetaProducto
        nombreProducto="Laptop"
        precio={1500}
        descripcion="Una potente laptop para trabajar y jugar."
        enStock={true}
      />
      <TarjetaProducto
        nombreProducto="Smartphone"
        precio={800}
        descripcion="Un smartphone de última generación."
        enStock={false}
      />
      <TarjetaProducto
        nombreProducto="Auriculares"
        precio={200}
        descripcion="Auriculares con cancelación de ruido."
        enStock={true}
      />
      <TarjetaProducto
        nombreProducto="Monitor"
        precio={300}
        descripcion="Monitor 4K para una experiencia visual increíble."
        enStock={true}
      />
    </div>
  );
};

export default TP;
