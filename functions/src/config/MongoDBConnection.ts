import { MongoClient } from "mongodb";
import * as functions from "firebase-functions"; 

export class MongoDBConnection {
    private static client: MongoClient | null = null;
    private static uri:string= functions.config().mongodb.uri; 
    public static async getClient(): Promise<MongoClient>{
        if(this.client === null){
            this.client = new MongoClient(this.uri); 
            await this.client.connect(); 
        }
        return this.client; 
    }
}