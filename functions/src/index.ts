import * as admin from "firebase-admin";
admin.initializeApp();

import * as functions from "firebase-functions";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import usersRouter from "./routes/usersRouter";
import datesRouter from "./routes/datesRouter";

const app = express();
app.use(cors());
app.use(express.json());

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
};

app.use(errorHandler);

app.use("/api", usersRouter);
app.use("/api", datesRouter);

export const backendAPI = functions.https.onRequest(app);
