const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt

const app = express();

// Allow requests from the specified frontend origin
app.use(cors());
const dbURI = "mongodb+srv://manikandan05082003:Manicdon07%40@cluster0.scriurb.mongodb.net/Cars";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Parse incoming JSON data
app.use(express.json());

require("./models/card");
const User = mongoose.model("CarInfo");
app.post("/post", async (req, res) => {
  const { companyname, modelname, year, amount } = req.body;
  try {
    await User.create({
      companyname,
      modelname,
      year,
      amount,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// Define a route to fetch car information
app.get("/fetchCars", async (req, res) => {
  try {
    const carInfo = await User.find();
    res.json(carInfo);
  } catch (error) {
    console.error("Error fetching car info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.json());
require("../backend/models/signup");
const sign = mongoose.model("signupdata");

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await sign.create({
      username,
      password: hashedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


app.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the user's data from the database using the username
    const user = await sign.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/userdata", async (req, res) => {
  try {
    const user = await sign.findOne(); // Assuming you only have one user record
    if (user) {
      // Send the username as a JSON response
      res.json({ username: user.username });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
