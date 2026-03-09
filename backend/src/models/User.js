const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const favoriteSchema = new mongoose.Schema(
  {
    tmdbId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: { type: String },
    mediaType: { type: String, enum: ["movie", "tv", "person"], default: "movie" },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
);

const historyItemSchema = new mongoose.Schema(
  {
    tmdbId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: { type: String },
    mediaType: { type: String, enum: ["movie", "tv", "person"], default: "movie" },
    action: { type: String, enum: ["open", "trailer"], default: "open" },
  },
  { _id: false, timestamps: { createdAt: "watchedAt", updatedAt: false } }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBanned: { type: Boolean, default: false },
    favorites: [favoriteSchema],
    watchHistory: [historyItemSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

