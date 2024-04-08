import express from "express";
import * as exerciseController from "../controllers/exerciseController"
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const exerciseRouter = express.Router()

exerciseRouter.get("/exercises/:exerciseId", firebaseAuthMiddleware, exerciseController.getExercise)

exerciseRouter.post("/exercises", firebaseAuthMiddleware, exerciseController.addExercise)

exerciseRouter.put("/exercises/:exerciseId", firebaseAuthMiddleware, exerciseController.editExercise)

exerciseRouter.delete("/exercises/:exerciseId", firebaseAuthMiddleware,exerciseController.removeExercise)

exerciseRouter.put("/exercises/:exerciseId/sets/:setId", firebaseAuthMiddleware, exerciseController.addSetToExercise)

exerciseRouter.put("/exercises/:exerciseId/sets/delete/:setId", firebaseAuthMiddleware, exerciseController.deleteSetToExercise);

//create new exercise and add to specific routine 
exerciseRouter.post("/exercises/:routineId", firebaseAuthMiddleware, exerciseController.addExerciseToRoutine)

// exerciseRouter.get("/exercises/favorite", firebaseAuthMiddleware, exerciseController.getFavoriteExercises); 

// exerciseRouter.get("/exercises/:id/sets", firebaseAuthMiddleware,exerciseController.getSets)

export default exerciseRouter
