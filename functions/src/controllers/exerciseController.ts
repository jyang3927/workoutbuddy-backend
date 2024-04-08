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
        const exerciseId = req.params.exerciseId;
        const results = await exerciseRepository.findExerciseById(exerciseId); 
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
        const exerciseId = req.params.exerciseId;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
    await exerciseRepository.removeExerciseData(exerciseId)
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
        const exerciseId = req.params.exerciseId;
        const exerciseUpdate = req.body; 
        await exerciseRepository.editExerciseData(exerciseId, exerciseUpdate);
        return res.status(200).json({ message: "Date updated successfully." })
    }
    catch (error:any){
        console.error("Error updating date:", error);
        return next(error);
    }
}

export const addSetToExercise = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid; 
        if(!userId){
            return res.status(400).send("Unauthorized"); 
        }
        const exerciseId = req.params.exerciseId; 
        const addSet = req.params.setId; 
        await exerciseRepository.addSetById(exerciseId, addSet); 
        return res.status(200).json({message: "Exercise Sets Updated Successfully"}); 
    }catch (error:any){
        console.error("Error updating date:", error);
        return next(error);
    }
}

export const deleteSetToExercise = async(req:AuthRequest, res:Response, next:NextFunction) => {
    try{
        const userId = req.user?.uid; 
        if(!userId){
            return res.status(400).send("Unauthorized"); 
        }
        const exerciseId = req.params.exerciseId;
        const deleteSet = req.params.setId; 
        await exerciseRepository.deleteSetById(exerciseId, deleteSet); 
        return res.status(200).json({message: "Exercise Sets Updated Successfully"}); 
    }catch (error:any){
        console.error("Error updating date:", error);
        return next(error);
    }
}

//add new Exercise to specific Routine 
export const addExerciseToRoutine = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid; 
        if(!userId){
            return res.status(400).send("Unauthorized"); 
        }
        const newExercise = req.body as Exercise; 
        const {routineId} = req.params; 
        newExercise.uId = userId; 
        const result = await exerciseRepository.insertExercise(
            newExercise, routineId
        );
        return res.status(201).json(result); 
    }catch(error:any){
        return next(error)
    }
}

//delete exercise from Routine 
// export const deleteExerciseFromRoutine = async(req: AuthRequest)







// export const getSets = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.user?.uid;
//         if(!userId){
//             return res.status(400).send("Unauthorized");
//         }
//         let result = await exerciseRepository.findAllSets(userId)
//         return res.status(200).json(result)
//     }
//     catch(error:any) {
//         console.error("Error updating date:", error);
//         return next(error);
//     }
// }

// export const getFavoriteExercises = async(req: AuthRequest, res: Response, next: NextFunction) => {
//     try{
//         const userId = req.user?.uid;
//         if(!userId){
//             return res.status(400).send("Unauthorized");
//         }
//         const results = await exerciseRepository.findFavoriteExercises(userId); 
//         return res.status(200).json(results)
//     }
//     catch(error: any){
//         return next(error); 
//     }
// }