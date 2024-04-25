import React, { useState } from "react";

function SignUp(){
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  function post() {
      const _username = document.getElementById('username').value;
      const _password = document.getElementById('password').value;

      if(!_username |!_password ){
        alert("Please fill in all fields before posting.");
      }
      else{
      setUsername('');
      setPassword('');
    }
    fetch("http://localhost:5000/signup", {
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*"
        },
        body:JSON.stringify({
          username,
          password
        }),
        }).then((res)=>res.json({status:"ok"}))
          .then((data) => {
            window.location.href = "/Login";
            console.log(data,"userPost");
          })
    }
    
    function log(){
      window.location.href = '/Login';
    }

	return (
		<div>
			<div className="fixed bg-blue-500 top-[-50vmin] left-[-50vmin] w-[100vmin] h-[100vmin] shadow-[0px_0px_100px_rgba(0,0,0,0.562)] rounded-full after:right-[-50vmin] after:bottom-[-55vmin] after:w-[inherit] after:h-[inherit] after:shadow-[0px_0px_100px_rgba(0,0,0,0.562)] after:rounded-[inherit]"></div>
			<div className="h-full w-full flex justify-center mt-14">
				<div className="bg-gray-800 w-full max-w-[600px] h-full justify-self-center overflow-hidden relative z-[3] sm:w-full text-center shadow-[0px_50px_100px_rgba(0,0,0,0.644)] mx-10 my-5 pt-40 pb-[18px] before:translate-x-[-50%] px-12 rounded-[1.25rem] before:bg-blue-500  before:absolute before:top-[-880px] before:w-full before:h-[1000px] before:left-2/4">
					<div className="absolute flex items-center justify-self-center justify-center bg-white w-16 h-16 rounded-[50%] top-[30px]">
						<svg
							className="fill-blue-500 h-14 w-14"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
						</svg>
					</div>
					<h2 className="text-3xl font-semibold text-white  transition-all duration-[0.55s] mt-0 mb-[15px] mx-0">
						Create Account
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
							onClick={post}
							className=" rounded-[28px]  cursor-pointer w-1/2 h-[50px] text-blue-500 text-[1.2rem] font-semibold text-center justify-self-center transition-all duration-[0.375s]  border-2 hover:shadow-[0px_0px_25px] hover:shadow-blue-500 border-blue-500 "
							type="submit"
						>
							Sign Up
						</button>
					</form>
					<footer className=" text-neutral-400">
						Already have an account?&nbsp;&nbsp;
						<a
							onClick={log}
							className="font-medium no-underline text-blue-500 transition-all duration-[0.375s] hover:text-[#141414] hover:bg-blue-500 hover:tracking-[2px]"
						>
							Log In
						</a>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default SignUp;