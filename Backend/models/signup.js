const mongoose = require('mongoose');

const signupdetails = new mongoose.Schema(
    {
        username:String,
        password:String,
    },
    {
        collection:"signupdata",
    }
);

mongoose.model("signupdata",signupdetails);