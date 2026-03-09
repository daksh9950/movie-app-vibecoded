const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/favorites", protect, async (req, res) => {
  res.json({ favorites: req.user.favorites || [] });
});

router.post(
  "/favorites",
  protect,
  [
    body("tmdbId").notEmpty().withMessage("tmdbId is required"),
    body("title").notEmpty().withMessage("title is required"),
    body("posterPath").optional().isString(),
    body("mediaType").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tmdbId, title, posterPath, mediaType } = req.body;

    const exists = req.user.favorites.find((fav) => fav.tmdbId === tmdbId);
    if (exists) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    req.user.favorites.push({ tmdbId, title, posterPath, mediaType });
    await req.user.save();

    res.status(201).json({ favorites: req.user.favorites });
  }
);

router.delete("/favorites/:tmdbId", protect, async (req, res) => {
  const tmdbId = req.params.tmdbId;
  req.user.favorites = (req.user.favorites || []).filter((fav) => fav.tmdbId !== tmdbId);
  await req.user.save();
  res.json({ favorites: req.user.favorites });
});

router.get("/history", protect, async (req, res) => {
  const history = (req.user.watchHistory || []).slice().reverse();
  res.json({ history });
});

router.post(
  "/history",
  protect,
  [
    body("tmdbId").notEmpty().withMessage("tmdbId is required"),
    body("title").notEmpty().withMessage("title is required"),
    body("posterPath").optional().isString(),
    body("mediaType").optional().isString(),
    body("action").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tmdbId, title, posterPath, mediaType, action } = req.body;

    req.user.watchHistory.push({ tmdbId, title, posterPath, mediaType, action });

    if (req.user.watchHistory.length > 100) {
      req.user.watchHistory = req.user.watchHistory.slice(-100);
    }

    await req.user.save();

    res.status(201).json({ history: req.user.watchHistory });
  }
);

router.get("/admin/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.patch("/admin/users/:id/ban", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isBanned = true;
    await user.save();
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to ban user" });
  }
});

router.delete("/admin/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;

