import { ObjectId } from "mongodb";
import { Routines } from "./Routines";

export interface Date {
    _id?: ObjectId; 
    uId: string;
    date: string; 
    routines: Routines[]; 
    workedOut: boolean;
}