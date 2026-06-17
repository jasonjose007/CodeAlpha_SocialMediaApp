const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* ==========================
   GET ALL USERS
========================== */

router.get("/", async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   GET USER BY ID
========================== */

router.get("/:id", async (req, res) => {

    try {

        const user =
            await User.findById(
                req.params.id
            ).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   SEARCH USER
========================== */

router.get("/search/:username", async (req, res) => {

    try {

        const users =
            await User.find({

                username: {
                    $regex: req.params.username,
                    $options: "i"
                }

            }).select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   UPDATE PROFILE
========================== */

router.put("/:id", async (req, res) => {

    try {

        const updatedUser =
            await User.findByIdAndUpdate(

                req.params.id,

                {
                    username: req.body.username,
                    email: req.body.email
                },

                { new: true }

            ).select("-password");

        res.status(200).json(updatedUser);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;