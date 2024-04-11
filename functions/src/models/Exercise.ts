import mongoose from "mongoose";

export interface Exercise {
    uId: string;
    name: string;
    type: string; 
    muscle: string; 
    sets: mongoose.Schema.Types.ObjectId[];
  }