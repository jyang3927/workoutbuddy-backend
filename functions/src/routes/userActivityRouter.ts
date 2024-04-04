import express from "express";
import * as datesController from "../controllers/userActivityController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const userActivityRouter = express.Router();

//Get all dates for each user
userActivityRouter.get("/dates", firebaseAuthMiddleware, datesController.getAllDates);

// Get all routines for date
// datesRouter.get(
//   "/dates/:date/routines",
//   firebaseAuthMiddleware,
//   datesController.getAllRoutinesforDate
// );

// //creating new date
userActivityRouter.post(
  "/dates/",
  firebaseAuthMiddleware,
  datesController.addUserActivity
);

// //edit date
userActivityRouter.patch(
  "/dates/:id",
  firebaseAuthMiddleware,
  datesController.editDate
);

// //delete date
userActivityRouter.delete(
  "/dates/:id",
  firebaseAuthMiddleware,
  datesController.deleteDate
);

export default userActivityRouter;
