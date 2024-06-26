import express from 'express'; 
import * as usersController from '../controllers/usersController'; 
import { firebaseAuthMiddleware } from '../middleware/firebaseAuthMiddleware';

const usersRouter = express.Router(); 

//get user by uId from firebase
usersRouter.get("/users", firebaseAuthMiddleware, usersController.getUser); 

//create user by uId from firebase
usersRouter.post("/users", firebaseAuthMiddleware, usersController.addUser); 
//     //TODO: create an addUser function in usersController & usersRepo (name it differently)

// //grab all favorite exercises for user
usersRouter.get("/users/favorites/exercises", firebaseAuthMiddleware, usersController.getFavExercises); 
//     //TODO: create getFavExercises function in usersController & usersRepo (name differently) 

// //grab all favorite routines for user 
usersRouter.get("/users/favorites/routines", firebaseAuthMiddleware, usersController.getFavRoutines); 
//     //TODO: create getFavRoutines function in usersController & usersRepo (name differently)

// //add exercise to favorite exercises
usersRouter.patch("/users/favorites/exercises", firebaseAuthMiddleware, usersController.addFavExercise); 
//     //TODO: create addFavExercise function in usersController & usersRepo (name differently)

// //add routine to favorite routines
usersRouter.patch("/users/favorites/routines", firebaseAuthMiddleware, usersController.addFavRoutine); 
//     //TODO: create addFavRoutine function in usersController & usersRepo (name differently)

// delete exercise from favorite exercises 
usersRouter.delete("/users/favorites/exercises/:exercise", firebaseAuthMiddleware, usersController.deleteFavExercise); 

//delete routine from favorite routines
usersRouter.delete("/users/favorites/routines/:routine", firebaseAuthMiddleware, usersController.deleteFavRoutine);

export default usersRouter; 