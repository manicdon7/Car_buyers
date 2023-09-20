import './App.css';
import Card from './components/Card';
import React, { useState } from 'react';

function App() {
  const [Company, setCompany] = useState('');
  const [Image, setImage] = useState(null); // Use null as initial state
  const [Model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [posts, setPosts] = useState([]);

  function handleImageChange(e) {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  }

  function post() {
    const _name = document.getElementById('name').value;
    const _desc = document.getElementById('desc').value;
    const _year = document.getElementById('year').value;
    const _amount = document.getElementById('amount').value;

    if (!_name || !Image || !_desc || !_year || !_amount) {
      alert("Please fill in all fields before posting.");
      return; // Don't add an empty post
    }

    const newPost = {
      Company: _name,
      Image: URL.createObjectURL(Image), // Convert the file to a data URL
      Model: _desc,
      year: _year,
      price: _amount,
    };

    setPosts([...posts, newPost]);
    setImage(null);
    setCompany('');
    setModel('');
    setYear('');
    setPrice('');
  }

  return (
    <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-20'>
      <h1 className=' text-6xl text-center pt-10 text-gray-800 underline'>CarBuyer</h1>
      <h1 className="text-3xl text-center mt-5 text-gray-800">Car Details</h1>
      <div className='pl-96 ml-36'>
        <input
          type="text"
          placeholder='Company Name'
          id='name'
          value={Company}
          onChange={(e) => setCompany(e.target.value)}
          className='text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16'
          required
        /><br />
        <input
          type="file"
          accept='image/*'
          id='Image'
          onChange={handleImageChange}
          className='text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16'
          required
        /><br />
        <input
          type="text"
          placeholder='Model Name'
          id='desc'
          value={Model}
          onChange={(e) => setModel(e.target.value)}
          className='text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16'
          required
        /><br />
        <input
          type="text"
          placeholder='Year'
          id='year'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16'
          required
        /><br />
        <input
          type="text"
          placeholder='Price'
          id='amount'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16'
        /><br />
      </div>
      <div className='ml-96 pl-96'>
        <input
          type='button'
          value='Post'
          onClick={post}
          className='text-white hover:text-red-600 hover:bg-slate-300 pt-5'
        /><br /><br />
      </div>
      <div>
        <h1 className=' text-6xl text-center pt-10 text-gray-800 underline pb-5'>Buy Cars</h1>
      </div>
      <div className='grid grid-cols-4 justify-evenly'>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">No Cars available the moment</p>
        ) : (
          posts.map((post, index) => (
            <Card key={index} Company={post.Company} Model={post.Model} year={post.year} price={post.price} Image={post.Image} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
