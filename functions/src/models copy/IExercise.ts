import { ObjectId } from "mongodb";

export default interface IExercise {
    _id?: ObjectId; 
    uId: string; 
    exerciseName: string;
    exerciseType: string; 
    exerciseMuscle: string; 
    sets: ObjectId[]; 
    favoriteExercise: boolean;
}