import { ObjectId } from "mongodb";

export default interface User {
    _id?: ObjectId; 
    uId?: string; 
    userName: string; 
    favExercises: ObjectId[]; 
    favRoutines: ObjectId[]; 
}