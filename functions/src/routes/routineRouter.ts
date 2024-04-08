import express from "express";
import * as routineController from "../controllers/routineController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

// Adjust the path as necessary
const router = express.Router();
// Get single routine by ID
router.get(
  "/routines/:routineId",
  firebaseAuthMiddleware,
  routineController.getRoutine
);
// Create new routine
router.post(
  "/routines/:userActivityID",
  firebaseAuthMiddleware,
  routineController.addRoutine
);
// Update existing routine
router.put(
  "/routines/:routineId",
  firebaseAuthMiddleware,
  routineController.updateRoutine
);
// Delete routine
router.delete(
  "/routines/:routineId",
  firebaseAuthMiddleware,
  routineController.deleteRoutine
);

export default router;
