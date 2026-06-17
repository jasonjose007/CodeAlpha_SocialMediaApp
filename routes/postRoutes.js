const express = require("express");
const Post = require("../models/Post");

const router = express.Router();


/* ==========================
   CREATE POST
========================== */

router.post("/", async (req, res) => {

    try {

        const { user, content } = req.body;

        if (!content) {

            return res.status(400).json({
                message: "Post content required"
            });

        }

        const post = new Post({
            user,
            content
        });

        await post.save();

        const populatedPost =
            await Post.findById(post._id)
            .populate("user", "username email");

        res.status(201).json(populatedPost);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   GET ALL POSTS
========================== */

router.get("/", async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("user", "username email")
            .populate("comments.user", "username")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   GET SINGLE POST
========================== */

router.get("/:id", async (req, res) => {

    try {

        const post =
            await Post.findById(req.params.id)
            .populate("user", "username email")
            .populate("comments.user", "username");

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   LIKE POST
========================== */

router.put("/like/:id", async (req, res) => {

    try {

        const { userId } = req.body;

        const post =
            await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        if (!post.likes.includes(userId)) {

            post.likes.push(userId);

            await post.save();

        }

        res.json({
            likes: post.likes.length
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   COMMENT POST
========================== */

router.put("/comment/:id", async (req, res) => {

    try {

        const {
            userId,
            text
        } = req.body;

        const post =
            await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        post.comments.push({
            user: userId,
            text
        });

        await post.save();

        res.json({
            message: "Comment Added"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ==========================
   DELETE POST
========================== */

router.delete("/:id", async (req, res) => {

    try {

        const post =
            await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        await Post.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Post Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;