const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value);
            },
            message: "Please enter a valid Email",
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {

                return value.length >= 6;
            },
            message: "Password at least 6 character long ",
        }
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;