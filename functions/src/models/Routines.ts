import mongoose from "mongoose";

export interface Routines {
    uId: string;
    routineName: string; 
    exercises: mongoose.Schema.Types.ObjectId[];
}