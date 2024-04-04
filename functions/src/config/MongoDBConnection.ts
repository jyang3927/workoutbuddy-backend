// import { MongoClient } from "mongodb";
import * as functions from "firebase-functions"; 
import mongoose from "mongoose";

// export class MongoDBConnection {
//     private static client: MongoClient | null = null;
//     public static uri:string= functions.config().mongodb.uri; 
//     public static async getClient(): Promise<MongoClient>{
//         if(this.client === null){
//             this.client = new MongoClient(this.uri); 
//             await this.client.connect(); 
//         }
//         return this.client; 
//     }
//     public static connectMongoose(){
//         mongoose.connect(this.uri)
//     }
// }

export class MongoDBConnection {
    public static uri: string = functions.config().mongodb.uri;
    
    public static connectMongoose(): Promise<typeof mongoose> {
        return mongoose.connect(MongoDBConnection.uri);
    }
}