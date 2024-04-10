import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface UserActivity {
  _id: ObjectId;
  uId: string;
  date: Date;
  routines: mongoose.Schema.Types.ObjectId[];
  workedOut: boolean;
}
