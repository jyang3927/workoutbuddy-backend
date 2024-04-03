import { ObjectId } from "mongodb";
import { Routines } from "./Routines";

export interface Date {
  _id?: ObjectId;
  uId: string;
  date: string;
  routines: Routines[];
  workedOut: boolean;
}

// /dates/:id/routines/exercises/set -- update set (weight, reps etc)
// /dates/:id/routines/exercises -- update exercise (make something in wireframe)
// BOTH ARE PUT's DUE TO MULTIPLE ITEMS BEING EDITED INSIDE OBJECTS
