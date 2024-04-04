import { MongoDBConnection } from "../config/MongoDBConnection";
import {DOCUMENTS} from "../constants/Documents"; 
import { Routines } from "../models/Routines";
import User, { ExerciseWithoutSet } from "../models/User";

export const findUserById = async(uId: string): Promise<User | null> => {
    const client = await MongoDBConnection.getClient(); 
    console.log(client); 
    return client.db().collection<User>(DOCUMENTS.USERS).findOne({uId: uId})
}

export const insertUser = async(user:User): Promise<User> => {
    const client = await MongoDBConnection.getClient();
    const result = await client.db().collection<User>(DOCUMENTS.USERS).insertOne(user);
    return { ...user, _id: result.insertedId }
}

export const findAllExercises = async (uId:string): Promise <ExerciseWithoutSet[] | null> => {
    const client = await MongoDBConnection.getClient();
    const usersCollection = client.db().collection<User>(DOCUMENTS.USERS);
    const userDoc = await usersCollection.findOne({ uId: uId }) as User | null;
    return userDoc?.favExercises ?? [];
}

export const findAllRoutines = async (uId:string): Promise <Routines[] | null> => {
    const client = await MongoDBConnection.getClient();
    const usersCollection = client.db().collection<User>(DOCUMENTS.USERS);
    const userDoc = await usersCollection.findOne({ uId: uId }) as User | null;
    return userDoc?.favRoutines ?? [];
}

export const addToExercises = async (uId:string, exercise: ExerciseWithoutSet) => {
    const client = await MongoDBConnection.getClient()
    await client.db().collection<User>(DOCUMENTS.USERS).updateOne({ uId: uId }, {$push: {"favExercises": exercise}})
}

export const addToRoutines = async (uId:string, routine: Routines) => {
    const client = await MongoDBConnection.getClient()
    await client.db().collection<User>(DOCUMENTS.USERS).updateOne({ uId: uId }, {$push: {"favRoutines": routine}})
}

export const deleteFromExercises = async (uId:string, exercise: ExerciseWithoutSet) => {
    const client = await MongoDBConnection.getClient()
    await client.db().collection<User>(DOCUMENTS.USERS).updateOne({ uId: uId }, {$pull: {"favExercises": {name: exercise}}})
}

export const deleteFromRoutines = async (uId:string, routine: Routines) => {
    const client = await MongoDBConnection.getClient()
    await client.db().collection<User>(DOCUMENTS.USERS).updateOne({ uId: uId }, {$pull: {"favExercises": {name: routine}}})
}