import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Redis from "ioredis";

const NODE_ENV = process.env.NODE_ENV;

dotenv.config({
  path: `.env.${NODE_ENV}`,
});

const PORT = process.env.PORT;

if (!PORT) throw new Error("Server PORT must be defined.");

const app = express();

app.use(cors());

const SERVER_NAME = `Server ${Math.floor(Math.random() * 10000)}`;

const log = (value: any) => {
  return console.log(`${SERVER_NAME} log: ${value}`);
};

const buildResult = (value: any) => {
  return `${SERVER_NAME}:
    ${value}
  `;
};

const redis = new Redis(
  Number(process.env.REDIS_PORT),
  process.env.REDIS_HOST as string
);

app.get("/", (req, res) => {
  return res.send(buildResult("WELCOME TO TEST API SERVER"));
});

app.get("/tasks/increment", async (req, res) => {
  await redis.incr("incrementableValue");
  const incrementableValue = await redis.get("incrementableValue");

  return res.send(buildResult(incrementableValue));
});

app.listen(PORT, () => {
  log(`API server is running on port ${PORT}`);
});
