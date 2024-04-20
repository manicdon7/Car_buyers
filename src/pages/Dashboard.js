import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [companyname, setCompanyName] = useState('');
  const [modelname, setModelName] = useState('');
  const [year, setYear] = useState('');
  const [amount, setAmount] = useState('');
  const [carInfoList, setCarInfoList] = useState([]);
  const [user, setUser] = useState('');
  const [myPosts, setMyPosts] = useState([]);
  const [showMyPosts, setShowMyPosts] = useState(false); // State to toggle showing user's posts

  function sign() {
    window.location.href = '/signup';
  }

  function log() {
    window.location.href = '/Login';
  }

  function post() {
    const _companyname = document.getElementById('name').value;
    const _modelname = document.getElementById('desc').value;
    const _year = document.getElementById('year').value;
    const _amount = document.getElementById('amount').value;

    if (!_companyname || !_modelname || !_year || !_amount) {
      alert("Please fill in all fields before posting.");
    } else {
      const token = localStorage.getItem('token');
      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          companyname: _companyname,
          modelname: _modelname,
          year: _year,
          amount: _amount,
          username: user // Include username when posting
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userPost");
          fetchMyPosts(); // Refresh my posts after posting
        });
    }
  }

  function fetchAllPosts() {
    fetch("http://localhost:5000/fetchCars")
      .then((res) => res.json())
      .then((data) => {
        setCarInfoList(data); // Assuming setCarInfoList is used to update the state with the fetched posts
        setShowMyPosts(false); // Reset showMyPosts to false to display all posts
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }

  function fetchMyPosts() {
    const token = localStorage.getItem('token');
    const username = user; // Use the username from state
  
    if (!token) {
      console.error("Error: No token found.");
      return;
    }
  
    fetch(`http://localhost:5000/myPosts?username=${username}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to authenticate token.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched posts:", data);
        setMyPosts(data);
        setShowMyPosts(true); // Set showMyPosts to true to display user's posts
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }
  

  useEffect(() => {
    const fetchUsername = () => {
      const token = localStorage.getItem('token');

      if (token) {
        fetch("http://localhost:5000/getUsername", {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json"
          }
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.username); 
          })
          .catch((error) => {
            console.error("Error fetching username:", error);
          });
      }
    };
  
    // Fetch the username when the component mounts
    fetchUsername();
  
    // Fetch car information
    fetchAllPosts();
  }, []);

  return (
    <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6'>
      <div className='flex justify-end gap-5'>
        <div className='flex gap-5'>
          <button onClick={sign} className='flex justify-end text-2xl bg-yellow-200 rounded-full hover:text-white p-1 text-gray-800 gap-5'>
            SignUp
          </button>
          <button onClick={log} className='flex justify-end text-2xl bg-yellow-200 rounded-full hover:text-white p-1 text-gray-800 gap-5'>
            Login
          </button>
        </div>
        <div className='flex justify-end text-2xl pr-5 pt-1 text-gray-800 gap-5'>
          <h1 className='bg-yellow-200 rounded-full hover:text-white p-1'>UserName: {user}</h1>
        </div>
      </div>
      <h1 className='text-6xl text-center pt-10 text-gray-800 underline'>CarBuyer</h1>
      <h1 className="text-3xl text-center mt-5 text-gray-800">Car Details</h1>
      <center className=''> 
        <input type="text" placeholder='Company Name' id='name' value={companyname} onChange={(e) => setCompanyName(e.target.value)} className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
        <input type="text" placeholder='Model Name' id='desc' value={modelname} onChange={(e) => setModelName(e.target.value)} className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
        <input type="text" placeholder='Year' id='year' value={year} onChange={(e) => setYear(e.target.value)} className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
        <input type="text" placeholder='Price' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
      </center>
      <center className=''>
        <input type='button' value='Post' onClick={post} className='text-white mt-6 w-28 h-8 rounded-2xl hover:text-red-500 text-2xl font-bold border-black hover:bg-fuchsia-600 cursor-pointer align-middle text-center' /><br /><br />
      </center>
      <div>
        <center className='flex justify-center gap-10'>
          <button className='p-2 bg-yellow-300 rounded-full hover:text-white' onClick={fetchAllPosts}>All Posts</button>
          <button className='p-2 bg-yellow-300 rounded-full hover:text-white' onClick={fetchMyPosts}>My Posts</button>
        </center>
      </div>
      <div>
        <center className='text-6xl text-center pt-10 text-gray-800 underline pb-5'>
          Buy Cars
        </center>
      </div>
      <div className='mt-8 grid lg:grid-cols-3 gap-7 sm:grid-cols-1'>
        {(showMyPosts ? myPosts : carInfoList).map((post) => (
          <div key={post._id}>
            <div className="bg-white w-80 pt-6 ml-6 pb-6 rounded-3xl">
              <h2 className='text-center text-2xl'>Details</h2>
              <div className='flex items-start mt-1'>
                <span className='w-32 font-bold ml-5 mt-2'>Company:</span>
                <span className='flex-1 truncate mt-2'>{post.companyname}</span>
              </div>
              <div className='flex items-start'>
                <span className='w-32 font-bold ml-5 mt-2'>Model:</span>
                <span className='flex-1 truncate mt-2'>{post.modelname}</span>
              </div>
              <div className='flex items-start'>
                <span className='w-32 font-bold ml-5 mt-2'>Year:</span>
                <span className='flex-1 truncate mt-2'>{post.year}</span>
              </div>
              <div className='flex items-start'>
                <span className='w-32 font-bold ml-5 mt-2'>Price:</span>
                <span className='flex-1 truncate mt-2'>{post.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
