import express from "express";
import * as exerciseController from "../controllers/exerciseController"
import { firebaseAuthMiddleware } from "../middleware/firebaseAuthMiddleware";

const exerciseRouter = express.Router()

exerciseRouter.get("/exercises/:exerciseId", firebaseAuthMiddleware, exerciseController.getExercise)

// exerciseRouter.get("/exercises/favorite", firebaseAuthMiddleware, exerciseController.getFavoriteExercises); 

exerciseRouter.post("/exercises", firebaseAuthMiddleware, exerciseController.addExercise)

exerciseRouter.put("/exercises/:id", firebaseAuthMiddleware, exerciseController.editExercise)

exerciseRouter.delete("/exercises/:exerciseId", firebaseAuthMiddleware,exerciseController.removeExercise)

// exerciseRouter.get("/exercises/:id/sets", firebaseAuthMiddleware,exerciseController.getSets)

export default exerciseRouter
