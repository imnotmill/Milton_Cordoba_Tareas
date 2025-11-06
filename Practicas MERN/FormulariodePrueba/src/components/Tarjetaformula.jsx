import { useState } from 'react'

const Tarjetaformula = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    return (
        <form>
            <div>
                <label htmlFor="titulo">Titulo:</label>
                <input type="text" id="titulo" name="titulo" value={titulo}/>
            </div>
            <div>
                <label htmlFor="descripcion">Descripcion:</label>
                <input type="text" id="descripcion" name="descripcion" value={descripcion}/>
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}
export default Tarjetaformula