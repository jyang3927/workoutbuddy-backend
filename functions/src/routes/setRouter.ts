import express from 'express'; 
import * as setController from '../controllers/setController'; 
import { firebaseAuthMiddleware } from '../middleware/firebaseAuthMiddleware';

const setRouter = express.Router(); 

// setRouter.get("/exercises/:id/sets/:setId", firebaseAuthMiddleware, setController.getSet); 
setRouter.get("/sets/:setId", firebaseAuthMiddleware, setController.getSet); 

setRouter.post("/sets", firebaseAuthMiddleware, setController.addSet); 

setRouter.put("/sets/:setId", firebaseAuthMiddleware, setController.editSet); 

setRouter.delete("/sets/:setId", firebaseAuthMiddleware, setController.deleteSet)

export default setRouter;