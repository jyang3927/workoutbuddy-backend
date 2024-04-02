import { Response, NextFunction } from "express"; 
import * as admin from 'firebase-admin'; 
import { AuthRequest } from "../models/AuthRequest";

export const firebaseAuthMiddleware = async (req:AuthRequest, res:Response, next:NextFunction) => {
    try{
        const token = req.headers.authorization?.split('Bearer ')[1];
        if(!token){
            return res.status(401).send('Unauthorized: no token provided');
        }

        //verify the token
        const decodedToken = await admin.auth().verifyIdToken(token); 
        req.userId = decodedToken.uid;

        return next();

    }catch(error:any){
        res.status(403).send('Unauthorized: invalid token');
    }
}