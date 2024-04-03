import { ObjectId } from "mongodb";
import Exercise from "./Exercise";
import { Routines } from "./Routines";

export type ExerciseWithoutSet = Omit<Exercise, 'sets'>

export default interface User {
    _id?: ObjectId; 
    uId?: string; 
    userName: string; 
    favExercises: ExerciseWithoutSet[]; 
    favRoutines: Routines[]; 
}