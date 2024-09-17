import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

// Initialize environment variables
dotenv.config();

// Set up memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Create Express app
const app = express();

// Define a route for file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "demo",
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Upload failed", error });
        }
        res.status(200).json(result);
      }
    );

    // Convert file buffer to readable stream and pipe to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//ritik