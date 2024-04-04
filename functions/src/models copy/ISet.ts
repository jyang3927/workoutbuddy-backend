import { ObjectId } from "mongodb";

export interface ISet{
    _id?: ObjectId; 
    uId: string; 
    weight?: number; 
    reps?: number; 
    time?: number; 
    distance?: number; 
}