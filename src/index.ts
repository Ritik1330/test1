import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.get("/json", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Category Deleted Succesfully",
  });
});

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");
cloudinary.config({
  cloud_name: "dbacwthnv",
  api_key: "511772263679235",
  api_secret: "0opOgfJbWCdJmdzQHjka-eMjVXc",
  secure: true,
});
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
app.get("/img", async (req: any, res: Response) => {
  await runMiddleware(req, res, uploadMiddleware);
  console.log(req.file.buffer);
  const stream = await cloudinary.uploader.upload_stream(
    {
      folder: "demo",
    },
    (error, result) => {
      if (error) return console.error(error);
      res.status(200).json(result);
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
});
// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
