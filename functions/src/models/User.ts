import { ObjectId } from "mongodb";
import { Routines } from "./Routines";
import { Exercise } from "./Exercise";

export type ExerciseWithoutSet = Omit<Exercise, 'sets'>

export interface User {
    _id?: ObjectId; 
    uId?: string; 
    userName: string; 
    favExercises: ExerciseWithoutSet[]; 
    favRoutines: Routines[]; 
}