const Gadget = ({ tipo, color, esPortable }) => {
  return (
    <div>
      <h1>{tipo}</h1>
      <p>{color}</p>
      <p>{esPortable ? 'Portable' : 'No es portable'}</p>
    </div>
  );
};

export default Gadget;