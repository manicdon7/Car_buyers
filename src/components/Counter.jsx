import React from 'react'
import { useState } from 'react';

const Counter = () => {
        const [count,setCount] = useState(0);
        const increase = () => {
        setCount(count+1);
  }
        const decrease = () => {
        setCount(count-1);
  }
        const reload = () => {
        setCount(0);
  }
        return (
        <div>
        <h1>My counter program</h1>
        <p>My counter is: {count} </p>
        <button onClick={increase}>+</button> <br/>
        <button onClick={reload}>reload</button> <br/>
        <button onClick={decrease}>-</button> <br/>
        </div>
     )
}

export default Counter;
