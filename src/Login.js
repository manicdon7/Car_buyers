import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function post() {
    if (!username || !password) {
      setError("Please fill in all fields before posting.");
      return;
    }

    // Clear any previous error messages
    setUsername('');
    setPassword('');
    setError('');

    fetch("http://localhost:3000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then((res) => {
      if (res.status === 401) {
        setError("Invalid username or password");
      }
      return res.json();
    })
    .then((data) => {
      if (!error) {
        console.log(data, "userPost");
        console.log("Login button clicked");
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
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
      {error && <p className="text-red-600 text-center">{error}</p>}
      <center>
        <input
          type="button"
          value="Login"
          onClick={post}
          className="text-white mt-5 bg-red-600 hover:text-red-600 hover:bg-white rounded-md text-center"
        />
        <br />
        <br />
      </center>
    </div>
  );
}

export default Login;
