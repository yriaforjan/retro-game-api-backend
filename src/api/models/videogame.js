const mongoose = require("mongoose");

const videogameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    year: {
      type: Number,
      required: true,
      min: [1970, "El año no puede ser anterior a 1970"],
      max: [2005, "El año no puede ser posterior a 2005"],
    },
    genres: [
      {
        type: String,
        trim: true,
        enum: [
          "Action",
          "Adventure",
          "Platformer",
          "Shooter",
          "RPG",
          "Puzzle",
          "Fighting",
          "Sports",
          "Racing",
          "Simulation",
          "Strategy",
          "Beat 'em up",
          "Horror",
          "Maze",
          "Pinball",
          "Arcade",
        ],
      },
    ],
    console: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Arcade",
        "NES",
        "SNES",
        "Game Boy",
        "Game Boy Color",
        "Game Boy Advance",
        "Genesis",
        "Mega Drive",
        "Atari 2600",
        "Atari 5200",
        "Atari 7800",
        "PS1",
        "PS2",
        "N64",
      ],
    },
    description: {
      type: String,
      maxlength: [2000, "La descripción no puede exceder los 2000 caracteres"],
    },
    coverImg: { type: String, required: true, trim: true },
    favsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Videogame = mongoose.model("Videogame", videogameSchema, "videogames");

module.exports = Videogame;
