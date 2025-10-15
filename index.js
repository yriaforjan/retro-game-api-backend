require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const videogamesRouter = require("./src/api/routes/videogame");

const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(express.json());

app.use("/api/v1/videogames", videogamesRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
