import mongoose from "mongoose";
import * as functions from "firebase-functions"; 

//This class actually isn't necessary at all if you're going to use mongoose
export class MongoDBConnection {
    private static uri: string = functions.config().mongodb.uri;

    public static async connectMongoose(): Promise<void> {
        try {
            await mongoose.connect(this.uri);
            console.log("Connected to MongoDB with Mongoose successfully.");
        } catch (error) {
            console.error("Could not connect to MongoDB with Mongoose:", error);
        }
    }
}