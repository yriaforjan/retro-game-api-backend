const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Contraseña de 8 caracteres mínimo"],
    },
    favoriteVideogames: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Videogame",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
