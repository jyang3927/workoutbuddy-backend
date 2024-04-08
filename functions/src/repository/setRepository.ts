import { ObjectId } from "mongodb";
import { Set } from "../models/Set";
import SetSchema from '../models/schemas/SetSchema'; 
import ExerciseSchema from "../models/schemas/ExerciseSchema";


export const insertSet = async(set: Set): Promise<Set> => {
    return await SetSchema.create(set); 
}

export const findSetbyId = async(id:string ): Promise<Set | null> => {
    return await SetSchema.findOne({_id: new ObjectId(id)}).exec(); 
}; 

export const editSetbyId = async(id:string, set:Partial<SetSchema>): Promise<void> => {
    try{
        await SetSchema.findByIdAndUpdate(id, {$set: set}).exec(); 
    }catch (error) {
        console.error("Failed to edit set:", error);
        throw new Error("Failed to edit set.");
      }
}

export const deleteSetbyId = async(id: string): Promise<void> => {
    try{
        await SetSchema.deleteOne({_id: new ObjectId(id)}).exec(); 
    }catch(error){
        console.error("Failed to delete set:", error); 
        throw new Error("Failed to delete set")
    }
}


//Insert new set into exercise? -- router would be /sets/:exerciseId
export const insertSetId = async(
    set:Set, 
    exerciseId: string 
): Promise<Set> => {
    const newSet = await SetSchema.create(set); 
    await ExerciseSchema.findByIdAndUpdate(
        exerciseId, {
            $push: {sets: newSet._id},
        },{
            new:true
        }
    ); 
    return newSet;
}