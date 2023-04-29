import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.WHITELISTED_ORIGIN,
  })
);

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
