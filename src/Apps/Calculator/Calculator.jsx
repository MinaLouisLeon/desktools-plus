import React, { useState } from 'react';
import './Calculator.css';
import { useDispatch,useSelector } from 'react-redux';
import { actionSaveInput } from '../../redux/calculatorReducer';
function Calculator() {
    const dispatch = useDispatch(null);
    const inputValue = useSelector(state => state.calculatorReducer.inputValue)
  const [input, setInput] = useState(inputValue);

  function handleClick(e) {
    dispatch(actionSaveInput(input + e.target.value))
    setInput(input + e.target.value);
  }

  function handleClear() {
    dispatch(actionSaveInput(''))
    setInput('');
  }

  function handleEqual() {
    let result = ""
    try {
      // eslint-disable-next-line
       result = eval(input).toString()
    } catch (error) {
        result = error
    }
    setInput(result);
    dispatch(actionSaveInput(result));
  }

  function handleSqrt() {
    setInput(Math.sqrt(input).toString());
  }

  function handleSin() {
    setInput(Math.sin(input).toString());
  }

  function handleCos() {
    setInput(Math.cos(input).toString());
  }

  function handleTan() {
    setInput(Math.tan(input).toString());
  }

  function handleBackspace() {
    dispatch(actionSaveInput(input.slice(0,1)));
    // setInput(input.slice(0, -1));
  }

  return (
    <div className="calculator">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />

      <button className="operator" value="(" onClick={handleClick}>(</button>
      <button className="operator" value=")" onClick={handleClick}>)</button>
      <button className="clear" onClick={handleClear}>C</button>
      <button onClick={handleBackspace}>←</button>

      <button className="operator" value="sin" onClick={handleSin}>sin</button>
      <button className="operator" value="cos" onClick={handleCos}>cos</button>
      <button className="operator" value="tan" onClick={handleTan}>tan</button>
      <button className="operator" value="sqrt" onClick={handleSqrt}>√</button>

      <button value="7" onClick={handleClick}>7</button>
      <button value="8" onClick={handleClick}>8</button>
      <button value="9" onClick={handleClick}>9</button>
      <button className="operator" value="/" onClick={handleClick}>/</button>

      <button value="4" onClick={handleClick}>4</button>
      <button value="5" onClick={handleClick}>5</button>
      <button value="6" onClick={handleClick}>6</button>
      <button className="operator" value="*" onClick={handleClick}>*</button>

      <button value="1" onClick={handleClick}>1</button>
      <button value="2" onClick={handleClick}>2</button>
      <button value="3" onClick={handleClick}>3</button>
      <button className="operator" value="-" onClick={handleClick}>-</button>

      <button value="0" onClick={handleClick}>0</button>
      <button value="." onClick={handleClick}>.</button>
      <button onClick={handleEqual}>=</button>
      <button className="operator" value="+" onClick={handleClick}>+</button>

      
      
    </div>
  );
}

export default Calculator;