import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Create uploads folder if not exist
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router;
