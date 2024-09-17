"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
app.get("/json", (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Category Deleted Succesfully",
    });
});
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const streamifier_1 = __importDefault(require("streamifier"));
dotenv_1.default.config();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const uploadMiddleware = upload.single("file");
cloudinary_1.v2.config({
    cloud_name: "dbacwthnv",
    api_key: "511772263679235",
    api_secret: "0opOgfJbWCdJmdzQHjka-eMjVXc",
    secure: true,
});
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
app.get("/img", async (req, res) => {
    await runMiddleware(req, res, uploadMiddleware);
    console.log(req.file.buffer);
    const stream = await cloudinary_1.v2.uploader.upload_stream({
        folder: "demo",
    }, (error, result) => {
        if (error)
            return console.error(error);
        res.status(200).json(result);
    });
    streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
});
// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
