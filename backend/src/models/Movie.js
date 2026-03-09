const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    posterImageUrl: { type: String },
    description: { type: String },
    tmdbId: { type: String }, // optional TMDB/movie ID reference
    releaseDate: { type: String },
    trailerYoutubeLink: { type: String },
    genre: { type: String },
    category: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

