"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const streamifier_1 = __importDefault(require("streamifier"));
// Initialize environment variables
dotenv_1.default.config();
// Set up memory storage for multer
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});
// Create Express app
const app = (0, express_1.default)();
// Define a route for file upload
app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    try {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: "demo",
        }, (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Upload failed", error });
            }
            res.status(200).json(result);
        });
        // Convert file buffer to readable stream and pipe to Cloudinary
        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//ritik
