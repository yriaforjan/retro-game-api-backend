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
    image: { type: String, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
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
  // SOLO hasheamos la contraseña si ha sido modificada (registro o cambio de clave), sino tendremos errores de login por DOBLE-HASH!!!!!!
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
