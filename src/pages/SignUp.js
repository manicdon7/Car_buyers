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
      fetch("http://localhost:3000/signup", {
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
    return(
        <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6 h-screen">
            <h1 className=' text-6xl text-center pt-10 text-gray-800 underline'>CarBuyer</h1>
      <h1 className="text-3xl text-center mt-5 text-gray-800">SignUp Form</h1>
        <center className=''> 
          <input type="text" placeholder='User Name' id='username' value={username} onChange={(e) => setUsername(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
          <input type="Password" placeholder='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl flex justify-center' required /><br />
        </center>
        <center className=''>
          <input type='button' value='SignUp' onClick={post} className='text-white mt-5 bg-red-600 hover:text-red-600 hover:bg-white rounded-md text-center' /><br /><br />
        </center>
        <center>Already have an account? <span onClick={log} className=" hover:text-red-500 cursor-pointer">Login</span></center>
    </div>
    )
}

export default SignUp;