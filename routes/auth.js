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
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Login API
authRouter.post('/api/login', async (req, res) => {
    try {
        const { email, password: userPassword } = req.body;

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: "User not found with this Email!" });
        }

        const isMatch = await bcrypt.compare(userPassword, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password!" });
        }

        const token = jwt.sign({ id: findUser._id }, "PasswordKey", { expiresIn: "1h" });

        const { password: _, ...userWithoutPassword } = findUser._doc; // Rename password to _

        res.status(200).json({
            message: "User Login Successfully!",
            token,
            user: userWithoutPassword
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = authRouter;