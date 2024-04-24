import React, { useState, useEffect } from "react";
import "../output.css";

function Dashboard() {
	const [companyname, setCompanyName] = useState("");
	const [modelname, setModelName] = useState("");
	const [year, setYear] = useState("");
	const [amount, setAmount] = useState("");
	const [carInfoList, setCarInfoList] = useState([]);
	const [user, setUser] = useState("");
	const [myPosts, setMyPosts] = useState([]);
	const [showMyPosts, setShowMyPosts] = useState(false);
	const [session, setSession] = useState(false);

	function sign() {
		window.location.href = "/signup";
	}

	function login() {
		window.location.href = "/Login";
	}

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

	function post() {
		const _companyname = document.getElementById("name").value;
		const _modelname = document.getElementById("desc").value;
		const _year = document.getElementById("year").value;
		const _amount = document.getElementById("amount").value;

		if (!_companyname || !_modelname || !_year || !_amount) {
			alert("Please fill in all fields before posting.");
		} else {
			const token = localStorage.getItem("token");
			fetch("http://localhost:5000/post", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({
					companyname: _companyname,
					modelname: _modelname,
					year: _year,
					amount: _amount,
					username: user, // Include username when posting
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data, "userPost");
					fetchMyPosts(); // Refresh my posts after posting
				});
		}
	}

  function fetchPosts () {
    let opt = document.getElementById("postFilter").value;
    if (opt === "allPosts") {
      fetchAllPosts();
    } else if (opt === "myPosts") {
      fetchMyPosts();
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
		const token = localStorage.getItem("token");
		const username = user; // Use the username from state

		if (!token) {
			console.error("Error: No token found.");
			return;
		}

		fetch(`http://localhost:5000/myPosts?username=${username}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
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
			const token = localStorage.getItem("token");

			if (token) {
				fetch("http://localhost:5000/getUsername", {
					method: "GET",
					headers: {
						Authorization: token,
						"Content-Type": "application/json",
					},
				})
					.then((res) => res.json())
					.then((data) => {
						setUser(data.username);
						setSession(true);
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
		<div className="bg-black bg-cover pb-6">
			<div className="flex justify-end gap-5">
				{session ? (
					<div className="flex-col  justify-center  pr-5 pt-1 text-gray-800 gap-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="fill-blue-500 h-10 w-10"
							viewBox="0 0 512 512"
						>
							<path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
						</svg>
						<h1 className="text-xl text-blue-500 p-1">{user}</h1>
            <button onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-blue-500 h-10 w-10" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
            Logout</button>
					</div>
				) : (
					<div className="flex gap-5">
						<button
							onClick={sign}
							className="flex justify-end text-xl px-4 py-2 bg-transparent transition-all ease-in-out duration-300 border-2 border-blue-500 shadow-md shadow-transparent hover:shadow-blue-500  text-white rounded-xl"
						>
							SignUp
						</button>
						<button
							onClick={login}
							className="flex justify-end text-xl px-4 py-2 bg-transparent transition-all ease-in-out duration-300 border-2 border-blue-500 shadow-md shadow-transparent hover:shadow-blue-500 text-white rounded-xl"
						>
							Login
						</button>
					</div>
				)}
			</div>
			<h1 className="text-6xl text-center pt-10 text-gray-800 underline">
				CarBuyer
			</h1>
			<h1 className="text-3xl text-center mt-5 text-gray-800">Car Details</h1>
			<center className="">
				<input
					type="text"
					placeholder="Company Name"
					id="name"
					value={companyname}
					onChange={(e) => setCompanyName(e.target.value)}
					className="text-center w-96 h-9 mt-10 rounded-2xl flex justify-center"
					required
				/>
				<br />
				<input
					type="text"
					placeholder="Model Name"
					id="desc"
					value={modelname}
					onChange={(e) => setModelName(e.target.value)}
					className="text-center w-96 h-9 mt-10 rounded-2xl flex justify-center"
					required
				/>
				<br />
				<input
					type="text"
					placeholder="Year"
					id="year"
					value={year}
					onChange={(e) => setYear(e.target.value)}
					className="text-center w-96 h-9 mt-10 rounded-2xl flex justify-center"
					required
				/>
				<br />
				<input
					type="text"
					placeholder="Price"
					id="amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className="text-center w-96 h-9 mt-10 rounded-2xl flex justify-center"
					required
				/>
				<br />
			</center>
			<center className="">
				<input
					type="button"
					value="Post"
					onClick={post}
					className="text-white mt-6 w-28 h-8 rounded-2xl hover:text-red-500 text-2xl font-bold border-black hover:bg-fuchsia-600 cursor-pointer align-middle text-center"
				/>
				<br />
				<br />
			</center>
			<div>
        <center className="flex justify-center gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-blue-500" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
				<select name="postFilter" id="postFilter" onChange={fetchPosts} className="p-2 bg-transparent text-white rounded-xl">
					<option value="allPosts" className='p-2 bg-white text-black rounded-xl' >All Posts</option>
					<option value="myPosts" className='p-2 bg-white text-black rounded-xl' >my Posts</option>
				</select>
        </center>
				{/* <center className='flex justify-center gap-10'>
          <button className='p-2 bg-yellow-300 rounded-full hover:text-white' onClick={fetchAllPosts}>All Posts</button>
          <button className='p-2 bg-yellow-300 rounded-full hover:text-white' onClick={fetchMyPosts}>My Posts</button>
        </center> */}
			</div>
			<div>
				<center className="text-6xl text-center pt-10 text-gray-800 underline pb-5">
					Buy Cars
				</center>
			</div>
			<div className="mt-8 grid lg:grid-cols-3 gap-7 sm:grid-cols-1">
				{(showMyPosts ? myPosts : carInfoList).map((post) => (
					<div key={post._id}>
						<div className="bg-white w-80 pt-6 ml-6 pb-6 rounded-3xl">
							<h2 className="text-center text-2xl">Details</h2>
							<div className="flex items-start mt-1">
								<span className="w-32 font-bold ml-5 mt-2">Company:</span>
								<span className="flex-1 truncate mt-2">{post.companyname}</span>
							</div>
							<div className="flex items-start">
								<span className="w-32 font-bold ml-5 mt-2">Model:</span>
								<span className="flex-1 truncate mt-2">{post.modelname}</span>
							</div>
							<div className="flex items-start">
								<span className="w-32 font-bold ml-5 mt-2">Year:</span>
								<span className="flex-1 truncate mt-2">{post.year}</span>
							</div>
							<div className="flex items-start">
								<span className="w-32 font-bold ml-5 mt-2">Price:</span>
								<span className="flex-1 truncate mt-2">{post.amount}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Dashboard;
