import { Response, NextFunction } from "express";
import { AuthRequest } from "../models/AuthRequest";
import { Exercise } from "../models/Exercise";
import * as exerciseRepository from "../repository/exerciseRepository"

export const getExercise = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const results = await exerciseRepository.findExerciseById(userId); 
        return res.status(200).json(results); 
    }
    catch(error: any){
        return next(error); 
    }
}

export const addExercise = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const user = req.body as Exercise;
        user.uId = userId
        const result = await exerciseRepository.addExerciseData(user);
        return res.status(201).json(result);
    } 
    catch (error: any) {
        return next(error);
    }
};

export const removeExercise = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
    await exerciseRepository.removeExerciseData(userId)
    }
    catch (error: any) {
        return next(error);
    }
}

export const editExercise = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        await exerciseRepository.editExerciseData(userId, req.body);
        return res.status(200).json({ message: "Date updated successfully." })
    }
    catch (error:any){
        console.error("Error updating date:", error);
        return next(error);
    }
}

export const getSets = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        let result = await exerciseRepository.findAllSets(userId)
        return res.status(200).json(result)
    }
    catch(error:any) {
        console.error("Error updating date:", error);
        return next(error);
    }
}