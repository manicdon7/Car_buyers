import React, { useState } from 'react';


function DisplayValues(props) {
  return (
    <div>
      <h2>Posted Values:</h2>
      <p>Name: {props.name}</p>
      <p>Description: {props.desc}</p>
      <p>Amount: {props.amount}</p>
    </div>
  );
}

function Form() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [posts, setPosts] = useState([]);

  function post() {
    const _name = document.getElementById('name').value;
    const _desc = document.getElementById('desc').value;
    const _amount = document.getElementById('amount').value;

    const newPost = {
      name: _name,
      desc: _desc,
      amount: _amount
    };

    setPosts([...posts, newPost]);
    setName('');
    setDesc('');
    setAmount('');
  }

  return (
    <div>
      <h1 className='post'>post</h1>
      <input type="text" placeholder='enter product name' id='name' value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input type="text" placeholder='enter product description' id='desc' value={desc} onChange={(e) => setDesc(e.target.value)} /><br />
      <input type="number" placeholder='enter product amount' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} /><br />
      <button type='submit' onClick={post}>Post</button><br /><br />
        
      {posts.map((post, index) => (
        <DisplayValues key={index} name={post.name} desc={post.desc} amount={post.amount} />
      ))}
    </div>
  );
}
    
export default Form;