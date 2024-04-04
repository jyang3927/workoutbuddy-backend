import { ObjectId } from "mongodb";

export interface IRoutine{
    _id: ObjectId; 
    uId: string; 
    routineName: string; 
    favoriteRoutine: boolean; 
    exercises: ObjectId[]; 
}