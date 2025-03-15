const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const authRouter = express.Router();
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

module.exports = authRouter;