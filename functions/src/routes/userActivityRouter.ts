import express from "express";
import * as datesController from "../controllers/userActivityController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const userActivityRouter = express.Router();

//Get all dates for each user
userActivityRouter.get(
  "/dates",
  firebaseAuthMiddleware,
  datesController.getAllDates
);

// //creating new date
userActivityRouter.post(
  "/userActivity/",
  firebaseAuthMiddleware,
  datesController.addUserActivity
);

// //edit date
userActivityRouter.patch(
  "/userActivity/:id",
  firebaseAuthMiddleware,
  datesController.editDate
);

// //delete date
userActivityRouter.delete(
  "/userActivity/:id",
  firebaseAuthMiddleware,
  datesController.deleteDate
);

export default userActivityRouter;
