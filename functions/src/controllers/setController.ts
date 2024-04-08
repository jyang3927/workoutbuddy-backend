import { Response, NextFunction } from 'express'; 
import * as setRepository from '../repository/setRepository'; 
import { AuthRequest } from '../models/AuthRequest';
import Set from '../models/schemas/SetSchema'

export const getSet = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const setId: string = req.params.setId;
        const results = await setRepository.findSetbyId(setId); 
        return res.status(200).json(results); 
    }catch(error: any){
        return next(error); 
    }
}

export const addSet = async(req:AuthRequest, res:Response, next:NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        } 
        const set = req.body as Set; 
        set.uId = userId; 
        const result = await setRepository.insertSet(set); 
        return res.status(201).json(result); 
    }catch (error: any) {
        return next(error);
    }
}

export const editSet = async(req:AuthRequest, res:Response, next:NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        } 
        const editSet = req.body as Set; 
        const id = req.params.setId;
        editSet.uId = userId; 
        await setRepository.editSetbyId(id, editSet); 
        return res.status(200).json({message:"Set Edit Successfully"})
    }catch(error:any){
        console.error("Error editing set", error); 
        return next(error);
    }
}

export const deleteSet = async(req:AuthRequest, res:Response, next:NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }  
        const id = req.params.setId;
        await setRepository.deleteSetbyId(id); 
        return res.status(200).json({message:"Delete Successful"})
    }catch(error:any){
        console.error("Error editing set", error); 
        return next(error);
    }
}

//Add new set 
export const addSetExercise = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(400).send("Unauthorized");
        }
        const newSet = req.body as Set; 
        const {exerciseId} = req.params; 
        newSet.uId = userId; 
        const result = await setRepository.insertSetId(
            newSet, exerciseId
        ); 
        return res.status(201).json(result);
    }catch (error: any) {
        return next(error);
    }
}
