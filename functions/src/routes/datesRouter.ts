import express from "express";
import * as datesController from "../controllers/datesController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const datesRouter = express.Router();

//Get all dates for each user
datesRouter.get("/dates", firebaseAuthMiddleware, datesController.getAllDates);

//creating new date
datesRouter.post(
  "/dates/",
  firebaseAuthMiddleware,
  datesController.addDateToUser
);
//delete date
datesRouter.delete(
  "/dates/:id",
  firebaseAuthMiddleware,
  datesController.deleteDate
);

//edit specific Set
datesRouter.put(
  "/dates/:id/routines/exercises/set",
  firebaseAuthMiddleware,
  datesController.editSet
);

//edit specific exercise
datesRouter.put(
  "/dates/:id/routines/exercises",
  firebaseAuthMiddleware,
  datesController.editExercises
);
export default datesRouter;
