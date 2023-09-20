const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://manikandan05082003:Manicdon07%40@cluster0.scriurb.mongodb.net/Car', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a MongoDB schema and model
const userSchema = new mongoose.Schema({
    companyname: String,
    Modelname: String,
    year: string,
    price:string
});

const User = mongoose.model('User', userSchema);

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'src/App.js');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const userData = {
        companyname: req.body.companyname,
        Modelname: req.body.Modelname,
        year: req.body.year,
        price: req.body.price
    };

    // Create a new user document and save it to the database
    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data to the database.');
        } else {
            res.send('Data saved to the database.');
        }
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
