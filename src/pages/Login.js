import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = () => {
    // Make a POST request to your server to authenticate the user
    fetch("http://localhost:5000/Login", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": "*"
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
    <div>
			<div className="fixed bg-blue-500 top-[-50vmin] left-[-50vmin] w-[100vmin] h-[100vmin] shadow-[0px_0px_100px_rgba(0,0,0,0.562)] rounded-full after:right-[-50vmin] after:bottom-[-55vmin] after:w-[inherit] after:h-[inherit] after:shadow-[0px_0px_100px_rgba(0,0,0,0.562)] after:rounded-[inherit]"></div>
			<div className="h-full w-full flex justify-center mt-14">
				<div className="bg-gray-800 w-full max-w-[600px] h-full justify-self-center overflow-hidden relative z-[3] sm:w-full text-center shadow-[0px_50px_100px_rgba(0,0,0,0.644)] mx-10 my-5 pt-40 pb-[18px] before:translate-x-[-50%] px-12 rounded-[1.25rem] before:bg-blue-500  before:absolute before:top-[-880px] before:w-full before:h-[1000px] before:left-2/4">
					<div className="absolute flex items-center justify-self-center justify-center bg-white w-16 h-16 rounded-[50%] top-[30px]">
              <svg  className="fill-blue-500 h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
					</div>
					<h2 className="text-3xl font-semibold text-white  transition-all duration-[0.55s] mt-0 mb-[15px] mx-0">
						Log In
					</h2>
					<form className="grid gap-5 mt-0 mb-[15px] mx-0">
						<input
							className="w-full h-[50px] rounded-[28px] ring-blue-500 outline-blue-500 border-neutral-400 text-base text-white bg-[#363636] transition-all duration-[0.5s] px-6 py-0 border-[3px] border-solid hover:border-blue-500 invalid:border-red-500 placeholder:text-neutral-400"
							type="text"
							placeholder="User Name"
							id='username' value={username} onChange={(e) => setUsername(e.target.value)}
							aria-label="username"
						/>
						<input
							className="w-full h-[50px] rounded-[28px] ring-blue-500 outline-blue-500 border-neutral-400 text-base text-white bg-[#363636] transition-all duration-[0.5s] px-6 py-0 border-[3px] border-solid hover:border-blue-500 invalid:border-red-500 placeholder:text-neutral-400"
							type="password"
							placeholder="Password"
              id="password"
							value={password} onChange={(e) => setPassword(e.target.value)} 
							aria-label="password"
						/>
						<button
							onClick={handleLogin}
							className=" rounded-[28px]  cursor-pointer w-1/2 h-[50px] text-blue-500 text-[1.2rem] font-semibold text-center justify-self-center transition-all duration-[0.375s]  border-2 hover:shadow-[0px_0px_25px] hover:shadow-blue-500 border-blue-500 "
							type="submit"
						>
							Log In
						</button>
					</form>
					<footer className=" text-neutral-400">
						Don't have an account?&nbsp;&nbsp;
						<a
							onClick={signin}
							className="font-medium no-underline text-blue-500 transition-all duration-[0.375s] hover:text-[#141414] hover:bg-blue-500 hover:tracking-[2px]"
						>
							Sign Up
						</a>
					</footer>
				</div>
			</div>
		</div>
  );
}

export default Login;
