import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./db";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.WHITELISTED_ORIGIN,
  })
);
app.use(bodyParser.json());

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

app.post(`/todos`, async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as { title: string };
  console.log("body", req.body);

  if (!body?.title) {
    next({
      message: "title not send",
      status: 400,
    });
    return;
  }

  const created = await db.todo.create({
    data: {
      title: body.title,
    },
  });

  res.status(201).json({
    id: created.id,
    title: created.title,
  });
});

app.get(`/todos`, async (req: Request, res: Response) => {
  const todos = await db.todo.findMany();
  res.status(200).json(
    todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
    }))
  );
});

app.delete(
  `/todos/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id;
    if (!id) {
      next({
        message: "Id not sent",
        status: 400,
      });
      return;
    }

    const todo = await db.todo.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!todo?.id) {
      next({
        message: "Id not found",
        status: 404,
      });
      return;
    }

    await db.todo.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ message: "Deleted" });
  }
);

app.use(
  (
    error: {
      message?: string;
      status?: number;
    },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const e = {
      message: error.message || "Something went wrong",
      status: error.status || 500,
    };
    console.error(`Error:`, e);
    res.status(e.status).send(e.message);
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
