import { Response, NextFunction } from "express";
import * as usersRepository from '../repository/usersRepository'; 
import { AuthRequest } from "../models/AuthRequest";
import User from "../models/User";

//use AuthRequest to make sure user is logged in and authorized 
export const getUser = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const results = await usersRepository.findUserById(userId); 
        return res.status(200).json(results); 
    }
    catch(error: any){
        return next(error); 
    }
}

export const addUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const user = req.body as User;
        user.uId = userId
        const result = await usersRepository.insertUser(user);
        return res.status(201).json(result);
    } 
    catch (error: any) {
        return next(error);
    }
};

export const getFavExercises = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        //unsure if userId is what we want in there
        const results = await usersRepository.findAllExercises(userId); 
        return res.status(200).json(results); 
    }
    catch(error: any){
        return next(error); 
    }
}

export const getFavRoutines = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        //unsure if userId is what we want in there
        const results = await usersRepository.findAllRoutines(userId); 
        return res.status(200).json(results); 
    }
    catch(error: any){
        return next(error); 
    }
}

export const addFavExercise = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const exercise = await usersRepository.addToExercises(userId, req.body);
        return res.status(201).json(exercise);
    } 
    catch (error: any) {
        return next(error);
    }
}

export const addFavRoutine = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const routine = await usersRepository.addToRoutines(userId, req.body);
        return res.status(201).json(routine);
    } 
    catch (error: any) {
        return next(error);
    }
}

export const deleteFavExercise = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const exercise = await usersRepository.deleteFromExercises(userId, req.body);
        return res.status(201).json(exercise);
    } 
    catch (error: any) {
        return next(error);
    }
}

export const deleteFavRoutine = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.uid;
        if(!userId){
            return res.status(400).send("Unauthorized");
        }
        const routine = await usersRepository.deleteFromRoutines(userId, req.body);
        return res.status(201).json(routine);
    } 
    catch (error: any) {
        return next(error);
    }
}