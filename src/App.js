import React, { useState,useEffect } from 'react';
import './App.css';

// function DisplayValues(props) {
//   return (
//     <div className=' mt-8'>
//       <div className='bg-white w-80 pt-6 ml-6 pb-6 rounded-3xl'>
//         <h2 className='text-center text-2xl'>Details</h2>
//         <div className='pl-6 pt-4 space-y-2'>
//           <div className='flex items-start'>
//             <span className='w-32 font-bold'>Name:</span>
//             <span className='flex-1 truncate'>{props.name}</span>
//           </div>
//           <div className='flex items-start'>
//             <span className='w-32 font-bold'>Model:</span>
//             <span className='flex-1 truncate'>{props.desc}</span>
//           </div>
//           <div className='flex items-start'>
//             <span className='w-32 font-bold'>Year:</span>
//             <span className='flex-1 truncate'>{props.year}</span>
//           </div>
//           <div className='flex items-start'>
//             <span className='w-32 font-bold'>Price:</span>
//             <span className='flex-1 truncate'>{props.amount}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


function App() {
  const [companyname, setCompnayName] = useState('');
  const [modelname, setModelName] = useState('');
  const [year, setYear] = useState('');
  const [amount, setAmount] = useState('');
  const [carInfoList, setCarInfoList] = useState([]);
  const [user,setUser] = useState('');


  function post() {
    const _companyname = document.getElementById('name').value;
    const _modelname = document.getElementById('desc').value;
    const _year = document.getElementById('year').value;
    const _amount = document.getElementById('amount').value;

    if(!_companyname |!_modelname |!_year |!_amount){
      alert("Please fill in all fields before posting.");
    }
    else{
    setCompnayName('');
    setModelName('');
    setYear('');
    setAmount('');
  }
  fetch("http://localhost:3000/post", {
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body:JSON.stringify({
        companyname,
        modelname,
        year,
        amount,
      }),
      }).then((res)=>res.json())
        .then((data) => {
          console.log(data,"userPost");
        })
  }
  function fetchCarInfo() {
    fetch("http://localhost:3000/fetchCars")
      .then((res) => res.json())
      .then((data) => {
        setCarInfoList(data); // Update the state with the retrieved car info
      })
      .catch((error) => {
        console.error("Error fetching car info:", error);
      });
  }

  useEffect(() => {
    // Fetch the user data
    fetch("http://localhost:3000/userdata")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.username); // Update the user state with the username
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch car information
    fetchCarInfo();
  }, []); 

      fetch("http://localhost:3000/userdata")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.username); // Update the user state with the username
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  
  return (
    <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6'>
      <div className='flex justify-end text-2xl text-center pr-5 pt-1 text-gray-800 gap-5'>
        <h1 value={user} onChange={(e)=>setUser(e.target.value)}>USerName:{user}</h1>
        <button className='bg-red-600 rounded-full hover:text-white p-1'>ChangeLogin</button>
      </div>
      <h1 className='text-6xl text-center pt-10 text-gray-800 underline'>CarBuyer</h1>
      <h1 className="text-3xl text-center mt-5 text-gray-800">Car Details</h1>
        <center className=''> 
          <input type="text" placeholder='Company Name' id='name' value={companyname} onChange={(e) => setCompnayName(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
          <input type="text" placeholder='Model Name' id='desc' value={modelname} onChange={(e) => setModelName(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
          <input type="text" placeholder='Year' id='year' value={year} onChange={(e) => setYear(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
          <input type="text" placeholder='Price' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
        </center>
        <center className=''>
          <input type='button' value='Post' onClick={post} className=' text-white mt-6 w-28 h-8 rounded-2xl hover:text-red-500 text-2xl font-bold border-black hover:bg-fuchsia-600 cursor-pointer align-middle text-center' /><br /><br />
        </center>
        <div>
          <center className=' text-6xl text-center pt-10 text-gray-800 underline pb-5'>
            Buy Cars
          </center>
        </div>
        <div className='mt-8 grid lg:grid-cols-3 gap-7 sm:grid-cols-1'>
          {carInfoList.map((carInfo) => (
        <div key={carInfo._id}>
          <div className="bg-white w-80 pt-6 ml-6 pb-6 rounded-3xl">
            <h2 className='text-center text-2xl'>Details</h2>
            <div className='flex items-start mt-1'>
              <span className='w-32 font-bold ml-5 mt-2'>Company:</span>
              <span className='flex-1 truncate mt-2'>{carInfo.companyname}</span>
            </div>
            <div className='flex items-start'>
              <span className='w-32 font-bold ml-5 mt-2'>Model:</span>
              <span className='flex-1 truncate mt-2'>{carInfo.modelname}</span>
            </div>
            <div className='flex items-start'>
              <span className='w-32 font-bold ml-5 mt-2'>Year:</span>
              <span className='flex-1 truncate mt-2'>{carInfo.year}</span>
            </div>
            <div className='flex items-start'>
              <span className='w-32 font-bold ml-5 mt-2'>Price:</span>
              <span className='flex-1 truncate mt-2'>{carInfo.amount}</span>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;