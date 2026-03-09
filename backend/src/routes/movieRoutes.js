const express = require("express");
const { body, validationResult } = require("express-validator");
const Movie = require("../models/Movie");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const movieValidators = [
  body("title").trim().notEmpty().withMessage("Movie title is required"),
  body("posterImageUrl").optional().isString(),
  body("description").optional().isString(),
  body("tmdbId").optional().isString(),
  body("releaseDate").optional().isString(),
  body("trailerYoutubeLink").optional().isString(),
  body("genre").optional().isString(),
  body("category").optional().isString(),
];

router.get("/", protect, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Movie.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Movie.countDocuments(),
    ]);

    res.json({
      items,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + items.length < total,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch movie" });
  }
});

router.post("/", protect, admin, movieValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const movie = await Movie.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create movie" });
  }
});

router.put("/:id", protect, admin, movieValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update movie" });
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete movie" });
  }
});

module.exports = router;

