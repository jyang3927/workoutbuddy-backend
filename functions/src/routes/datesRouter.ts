import express from "express";
import * as datesController from "../controllers/datesController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const datesRouter = express.Router();

//Get all dates for each user
datesRouter.get(
  "/users/:userId/dates",
  firebaseAuthMiddleware,
  datesController.getAllDates
);

//Get all routines for date
datesRouter.get(
  "/users/:userId/dates/:date/routines",
  firebaseAuthMiddleware,
  datesController.getAllRountinesforDate
);

// //creating new date
datesRouter.post(
  "/users/:userId/dates/:date",
  firebaseAuthMiddleware,
  datesController.addDateToUser
);

// //edit date
datesRouter.patch(
  "/users/:userId/dates/:date",
  firebaseAuthMiddleware,
  datesController.editDate
);

// //delete date
datesRouter.delete(
  "/users/:userId/dates/:date",
  firebaseAuthMiddleware,
  datesController.deleteDate
);

export default datesRouter;
