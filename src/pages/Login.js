import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = () => {
    // Make a POST request to your server to authenticate the user
    fetch("http://localhost:3000/Login", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Assuming the server responds with a token
        const { token } = data;
        
        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect to the dashboard or perform any other necessary action
        window.location.href = '/';
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Handle login errors here
      });
  };

  function signin(){
    window.location.href= '/signup';
  }
  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6 h-screen">
      <h1 className="text-6xl text-center pt-10 text-gray-800 underline">CarBuyer</h1>
      <h1 className="text-3xl text-center mt-5 text-gray-800">Login Form</h1>
      <center>
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-center w-96 h-9 mt-10 rounded-2xl flex justify-center"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-center w-96 h-9 mt-10 rounded-2xl flex justify-center"
          required
        />
        <br />
      </center>
      {/* {error && <p className="text-red-600 text-center">{error}</p>} */}
      <center>
        <input  
          type="button"
          value="Login"
          onClick={handleLogin}
          className="text-white mt-5 bg-red-600 hover:text-red-600 hover:bg-white rounded-md text-center"
        />
        <br />
        <br />
      </center>
      <center>Don't have an account? <span onClick={signin} className=" hover:text-red-500 cursor-pointer">SignUp</span></center>
    </div>
  );
}

export default Login;
