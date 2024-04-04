import mongoose from "mongoose";

export interface UserActivity {
    uId: string;
    date: Date; 
    routines: mongoose.Schema.Types.ObjectId[];
    workedOut: boolean;
  }