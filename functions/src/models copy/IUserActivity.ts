import { ObjectId } from "mongodb";

export interface IUserActivity {
    _id?: ObjectId; 
    uId: string;
    date: Date; 
    routines: ObjectId[]; 
    workedOut: boolean;
}
