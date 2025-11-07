import { useState } from 'react';
import Gadget from './Gadget';

const App = () => {
  const [gadgets] = useState([
    { tipo: 'Smartphone', color: 'Black', esPortable: true },
    { tipo: 'Laptop', color: 'Silver', esPortable: true },
    { tipo: 'Desktop', color: 'White', esPortable: false },
    { tipo: 'Smartwatch', color: 'Black', esPortable: true }
  ]);

  return (
    <>
      {gadgets.map((gadget, indice) => (
        <Gadget
          key={indice}
          tipo={gadget.tipo}
          color={gadget.color}
          esPortable={gadget.esPortable}
        />
      ))}
    </>
  );
};

export default App;