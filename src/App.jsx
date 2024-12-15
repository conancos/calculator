import { useState } from 'react'
import { evaluate } from 'mathjs'
import './App.css'
import logo from '/logo-conancos.png'

import Boton from './componentes/Boton.jsx'


function App() {
  const [input, setInput] = useState('')
  const [memory, setMemory] = useState('')
  const [lastWasEquals, setLastWasEquals] = useState(false)
  const [lastResult, setLastResult] = useState('')

  const handleClick = (event) => {
    
    // Evitar operadores iniciales:
    if ((event === '*' || event === '/') && (input === '' || input === '0')) return;
    // Permitir "-" o "+" después de "*" o "/" para negativos:
    if (['*', '/'].includes(input[input.length - 1]) && ['+', '-'].includes(event)) {
      setInput(input + event);
    };
    // Evitar dos operadores consecutivos:
    if (['+', '-', '*', '/'].includes(event)) {
      // Solo agregar el operador si el último carácter no es ya un operador
      if (['+', '-', '*', '/'].includes(input[input.length - 1])) 
        return; // No hacemos nada si ya hay un operador al final
    };

    // Evitar múltiples puntos decimales en el mismo número
    if (event === '.') {
      // Dividimos el input en los números y operadores, y verificamos el último número
      const lastNumber = input.split(/[\+\-\*\/]/).pop(); // Último número antes de un operador
      if (lastNumber.includes('.')) {
        return;
      }
    };
  
    // Si el input es '0' o está vacío, reemplazamos el '0' con el primer número
    if (input === '0' && event !== '.') {
      setInput(event.toString());
    } else {
      setInput(input + event);
    };

    // Manejar el caso en el que la entrada comienza con un decimal
    if (event === '.') {
      if (input === '' || input === '0') {
        setInput('0.');
      } else if (['+', '-', '*', '/'].includes(input[input.length - 1])){
        setInput(input + '0.');
      } else {
        const lastNumber = input.split(/[\+\-\*\/]/).pop();
        if (!lastNumber.includes('.')) {
          setInput(input + '.');
        }
      }
      return;
    };

    // Empezar un nuevo cálculo después de '=' (Test 14):
    // Agregar una nueva variable de estado para rastrear si laacción anterior fue '=':
    if (lastWasEquals) {
      if (['+', '-', '*', '/'].includes(event)) {
        // Si es un operador, continúa la operación con el resultado anterior
        setInput(lastResult + event);
      } else {
        // Si es un número o punto decimal, inicia una nueva operación
        setInput(event.toString());
      }
      setLastWasEquals(false);
    } else {
      // Lógica existente para manejar entradas normales
      if (input === '0' && event !== '.') {
        setInput(event.toString());
      } else {
        setInput(input + event);
      }
    }
    
    
  };


  /* const evaluate = (expression) => {
    return new Function('return ' + expression)();
  }; */

  const handleResult = () => {
    
    
    if (input) {
    /*   setInput(evaluate(input))
      setMemory(input + ' = ' + evaluate(input))
    } else {
      alert("Ingresa un número")
    }
    setLastWasEquals(true); */
      let result = evaluate(input);
      let formattedResult = Number(result.toFixed(4)).toString();
      setInput(formattedResult);
      setLastResult(formattedResult);
      setMemory(input + ' = ' + formattedResult);
      setLastWasEquals(true);
    } else {
      alert("Ingresa un número");
    }
  };
  
  const handleMemory = () => {
    setMemory(input);
    console.log("click memory")
    setInput('0')
  }



  return (

    <main className="App-calculator">
      <div className="conancos-logo-container">
        <img
          src={logo}
          className="conancos-logo"
          alt="logo"
        />
      </div>

      <div className="container">
        
        
        <div className="panel">
          
          <input id="memory" className="little-panel" value={memory} disabled placeholder='M'/>
          <input id="display" className="main-panel" value={input} onChange={(event) => setInput(event.target.value)} disabled placeholder='0'/>
        
        </div>


        <div className="teclado">
          
            <Boton id="clear" handleClick={() => setInput('0')} pad="AC"></Boton>
            <Boton id="divide" handleClick={handleClick} pad="/" >/</Boton>
            <Boton id="multiply" handleClick={handleClick} pad="*" ></Boton>
          
            <Boton id="seven" handleClick={handleClick} pad={7}></Boton>
            <Boton id="eight" handleClick={handleClick} pad={8}></Boton>
            <Boton id="nine" handleClick={handleClick} pad={9}></Boton>
            <Boton id="subtract" handleClick={handleClick} pad="-" >-</Boton>
          
            <Boton id="four" handleClick={handleClick} pad={4}></Boton>
            <Boton id="five" handleClick={handleClick} pad={5}></Boton>
            <Boton id="six" handleClick={handleClick} pad={6}></Boton>
            <Boton id="add" handleClick={handleClick} pad="+">+</Boton>
          
            <Boton id="one" handleClick={handleClick} pad={1}></Boton>
            <Boton id="two" handleClick={handleClick} pad={2}></Boton>
            <Boton id="three" handleClick={handleClick} pad={3}></Boton>
            <Boton id="equals" handleClick={handleResult} pad="=">=</Boton>
          
            <Boton id="memo" handleClick={handleMemory} pad={"Memory"}></Boton>
            <Boton id="zero" handleClick={handleClick} pad={0} ></Boton>
            <Boton id="decimal" handleClick={handleClick} pad="." >.</Boton>
          
        </div>
      </div>
      

    </main>
  )
}

export default App
