const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    firstname: { 
        type: String,
        required: true
    },
    lastname: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true  // Note the lowercase `unique`
    },
    phone: { 
        type: Number,
        required: true,
        unique: true  // Note the lowercase `unique`
    },
    id:{
        type:Number,
        require:true,
        unique:true
    },
    password: { 
        type: String,
        required: true
    },
    repeat: { 
        type: String,
        required: true
    }
});

const Register = mongoose.model("Register", accountSchema);

module.exports = Register;  // Use module.exports to export the model
