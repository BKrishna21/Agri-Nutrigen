

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import saveplanroutes from "./routes/savedplansRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import mlRoutes from "./routes/mlRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/savedplans", saveplanroutes );

app.use("/api/location", locationRoutes);

app.use("/api/ml", mlRoutes);


export default app;