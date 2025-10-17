const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "videogame_cover",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"],
  },
});

const uploadCover = multer({ storage });

module.exports = uploadCover;
