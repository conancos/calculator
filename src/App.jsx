import { useState } from 'react'
import { evaluate } from 'mathjs'
import './App.css'
import logo from '/logo-conancos.png'
import Boton from './componentes/Boton.jsx'
import Panel from './componentes/Panel.jsx'

function App() {
  const [input, setInput] = useState('')
  const [memory, setMemory] = useState('')
  const [memo, setMemo] = useState('')
  const [lastWasEquals, setLastWasEquals] = useState(false)
  const [lastResult, setLastResult] = useState('')

  
  const handleClick = (event) => {
    
    // Evitar operadores iniciales:
    if ((event === '*' || event === '/') && (input === '' || input === '0')) return;
    
    // Manejar operadores consecutivos:
    if (['+', '-', '*', '/'].includes(event)) {
      const lastChar = input[input.length - 1];
      const secondLastChar = input[input.length - 2];

      // Permitir "-" o "+" después de "*" o "/" para negativos:
      if (['*', '/'].includes(lastChar) && ['+', '-'].includes(event)) {
        setInput(input + event);
        return;
      }

      // Si el último carácter es un operador, reemplazarlo con el nuevo operador
      if (['+', '-', '*', '/'].includes(lastChar)) {
        if (lastChar === '-' && ['+', '*', '/'].includes(secondLastChar)) {
          // Reemplazar los dos últimos caracteres si son "*-" o "/-"
          setInput(input.slice(0, -2) + event);
        } else {
          // Reemplazar solo el último operador
          setInput(input.slice(0, -1) + event);
        }
        return;
      }
    };
      
    // Evitar múltiples puntos decimales en el mismo número
    if (event === '.') {
      // Dividimos el input en los números y operadores, y verificamos el último número
      const lastNumber = input.split(/[\+\-\*\/]/).pop(); // Último número antes de un operador
      if (lastNumber.includes('.')) return;
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

    // Empezar un nuevo cálculo después de '=':
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


  const handleResult = () => {
    if (input) {
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
  

  const handleClear = () => {
    setInput('0');
    if (input === '0') {
      setMemory('0');
    }
  }  

  const handleMemo = () => {
    setMemo(input);
    setInput('0')
    if (memo === '0') setMemo('');
    console.log("click memory")
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
        <Panel memo={memo} memory={memory} input={input} />

        <div className="teclado">
            <Boton id="clear" handleClick={handleClear} pad="AC"></Boton>
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
          
            <Boton id="memo" handleClick={handleMemo} pad={"Memory"}></Boton>
            <Boton id="zero" handleClick={handleClick} pad={0} ></Boton>
            <Boton id="decimal" handleClick={handleClick} pad="." >.</Boton>
        </div>
      </div>
    </main>
  )
}

export default App
