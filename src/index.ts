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

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
