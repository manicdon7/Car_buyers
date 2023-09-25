const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const secretKey = crypto.randomBytes(64).toString('hex');
const secret_Key = secretKey;

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
app.post('/post', async (req, res) => {
  const { companyname, modelname, year, amount } = req.body;
  // const imagePath = req.file.path; // Store the file path

  try {
    await User.create({
      companyname,
      modelname,
      year,
      amount,
      // imagePath, // Save the image path in the database
    });
    res.send({ status: 'ok' });
  } catch (error) {
    res.send({ status: 'error' });
  }
});


app.get('/myPosts', verifyToken, async (req, res) => {
  const username = req.username;

  try {
    const myPosts = await CarInfo.find({ creator: username });
    res.json(myPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Define a route to fetch car information
app.get('/fetchCars', async (req, res) => {
  try {
    const carInfo = await User.find();
    res.json(carInfo);
  } catch (error) {
    console.error('Error fetching car info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    const user = await sign.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JWT token with the username
      const token = jwt.sign({ username }, secret_Key);

      return res.json({ token });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a middleware function to verify JWT tokens
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, secret_Key, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Failed to authenticate token" });
    }

    // Store the username in the request for future use
    req.username = decoded.username;

    next();
  });
}

// Add an endpoint to get the username based on the token
app.get("/getUsername", verifyToken, (req, res) => {
  res.json({ username: req.username });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
