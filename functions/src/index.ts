import * as admin from "firebase-admin";
admin.initializeApp();

import * as functions from "firebase-functions";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import usersRouter from "./routes/usersRouter";
import userActivityRouter from "./routes/userActivityRouter";
import mongoose from "mongoose";
import exerciseRouter from "./routes/exerciseRouter";

const app = express();
app.use(cors());
app.use(express.json());

//connect to the database
mongoose.connect(functions.config().mongodb.uri)
   .then(() => console.log("Connected successfully!"))
   .catch((error:any) => {
    console.error('Error connecting to MongoDB', error);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
};

app.use(errorHandler);

app.use("/api", usersRouter);
app.use("/api", userActivityRouter)
app.use("/api", exerciseRouter)

export const backendAPI = functions.https.onRequest(app);
