const mongoose = require("mongoose");

const videogameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    year: { type: Number, required: true },
    genres: [{ type: String, trim: true }],
    console: { type: String, required: true, trim: true },
    description: { type: String },
    cover_img: { type: String, required: true, trim: true },
    favsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Videogame = mongoose.model("Videogame", videogameSchema, "videogames");

module.exports = Videogame;
