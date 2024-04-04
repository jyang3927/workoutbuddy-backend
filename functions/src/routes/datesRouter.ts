import express from "express";
import * as datesController from "../controllers/datesController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const datesRouter = express.Router();

//Get all dates for each user
datesRouter.get("/dates", firebaseAuthMiddleware, datesController.getAllDates);

// Get all routines for date
// datesRouter.get(
//   "/dates/:date/routines",
//   firebaseAuthMiddleware,
//   datesController.getAllRoutinesforDate
// );

// //creating new date
datesRouter.post(
  "/dates/",
  firebaseAuthMiddleware,
  datesController.addUserActivity
);

// //edit date
datesRouter.patch(
  "/dates/:id",
  firebaseAuthMiddleware,
  datesController.editDate
);

// //delete date
datesRouter.delete(
  "/dates/:id",
  firebaseAuthMiddleware,
  datesController.deleteDate
);

export default datesRouter;
