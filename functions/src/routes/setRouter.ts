import express from 'express'; 
import * as setController from '../controllers/setController'; 
import { firebaseAuthMiddleware } from '../middleware/firebaseAuthMiddleware';

const setRouter = express.Router(); 

setRouter.get("/exercises/sets/:setId", firebaseAuthMiddleware, setController.getSet); 

setRouter.post("/exercises/sets", firebaseAuthMiddleware, setController.addSet); 

setRouter.put("/exercises/sets/:setId", firebaseAuthMiddleware, setController.editSet); 

export default setRouter;