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