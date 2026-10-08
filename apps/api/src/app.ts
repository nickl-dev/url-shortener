import express from "express";
import cors from "cors";
import pool from "./db/pool.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    console.error(`Database health check failed: ${error}`);

    res.status(503).json({
      status: "error",
      database: "unavailable"
    });
  }
});

export default app;
