const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* ==========================
   REGISTER USER
========================== */

router.post("/register", async (req, res) => {
    console.log("Register Request:", req.body);

    try {
        const { username, email, password } = req.body;

        // Check Empty Fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check Existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        console.log("Saving User:", user);

        await user.save();

        console.log("User Saved Successfully");

        res.status(201).json({
            success: true,
            message: "Registration Successful"
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

/* ==========================
   LOGIN USER
========================== */

router.post("/login", async (req, res) => {

    try {

        console.log("LOGIN REQUEST:", req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        console.log("FOUND USER:", user);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;