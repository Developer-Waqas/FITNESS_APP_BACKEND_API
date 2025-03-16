const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();


// Register API
authRouter.post('/api/register', async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password } = req.body;
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.status(400).json({ message: "User with same Email/Phone Number already exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({ fullName, phoneNumber, email, password: hashedPassword });
            const saveUser = await user.save();
            res.status(200).json({ message: "User Created Successfully!", data: { saveUser } });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login API
authRouter.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: "User not found with this Email!" })
        } else {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect Password!" });
            } else {
                const token = jwt.sign({ id: findUser._id }, "PasswordKey");
                const { password, ...userWithoutPassword } = findUser._doc;
                res.status(200).json({ message: "User Login Successfully!" }, { token, ...userWithoutPassword });
            }
        }
    } catch (error) {

    }


});

module.exports = authRouter;