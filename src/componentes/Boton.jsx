import React from 'react'
import './styles/Boton.css'


const Boton = ({id, pad, handleClick }) => {

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