import React from 'react'
import './styles/Boton.css'



const Boton = ({id, pad, handleClick }) => {
    
    /* const esEspecial = (value) => {
        return typeof value == 'Number' ? 'boton-numeral' : 'boton-especial'
    } */
    return (
        <button 
            id={id}
            className={`button ${typeof pad !== 'number' ? 'boton-especial' : 'boton-numeral'}`}
            onClick={() => handleClick(pad)}
        >
            {pad}
        </button>
    )
}

export default Boton