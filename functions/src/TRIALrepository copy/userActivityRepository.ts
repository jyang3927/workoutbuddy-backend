// import { MongoDBConnection } from "../config/MongoDBConnection";
// import mongoose from "mongoose";
import UserActivity from "../models copy/schemas/UserActivitySchema";
import { IUserActivity } from "../models copy/IUserActivity";
import express from "express";

// interface UserActivityRepository {
//     create(userActivity: UserActivity): Promise<UserActivity>;
//     findAll(): Promise<UserActivity[]>;
//     findById(id: string): Promise<UserActivity | null>;
//     update(userId: string, userActivity: Partial<UserActivity>): Promise<UserActivity | null>;
//     delete(userId: string): Promise<void>;
//   }

const userActivityRouter = express.Router(); 

userActivityRouter.post(
    "/userActivity/:userId/", async(req,res) => {
        try{
            let response = createUserActivity(req.body); 
            console.log(response);
            return res.status(200)
        }catch(error:any){
            console.log(error); 
            return res.status(400)
            
        }
    }
  );
  
//Create user activity 
export const createUserActivity = async(userActivity: IUserActivity): Promise<IUserActivity> => {
    let newUserActivity = new UserActivity(userActivity); 
    return await newUserActivity.save(); 
}

//Find user activity 
export const findUserActivity = async(userId: string): Promise<IUserActivity[]> => {
    return await UserActivity.find({uId:userId});
}






// export const findAllDates = async (uId: string): Promise<Date[]> => {
//     const client = await MongoDBConnection.getClient();
//     const datesCollection = client.db().collection<Date>(DOCUMENTS.DATE);
//     const dates = await datesCollection.find({ uId: uId }).toArray();
//     return dates;
//   };