
import mongoose from "mongoose";
import { Exercise } from "../models/Exercise";
import ExerciseSchema from "../models/schemas/ExerciseSchema";


export const findExerciseById = async (uId: string): Promise<Exercise | null> => {
    return await ExerciseSchema.findOne({ uId: uId }).exec();
};

export const addExerciseData = async (exercise: Exercise): Promise<Exercise> => {
    return await ExerciseSchema.create(exercise);
};

export const removeExerciseData = async (uId: string): Promise<void> => {
    await ExerciseSchema.deleteOne({ uId: uId }).exec();
}

export const editExerciseData = async (uId:string, updates: Partial<Exercise>): Promise<void> => {
    try {
        await ExerciseSchema.updateOne(
          { uId: uId }, { $set: updates }).exec();
      } catch (error) {
        console.error("Failed to edit user activity:", error);
        throw new Error("Failed to edit user activity.");
      }
}

export const findAllSets = async (uId: string): Promise<mongoose.Schema.Types.ObjectId[] | null> => {
    const user = await ExerciseSchema.findOne({ uId: uId }).exec();
    return user?.sets ?? null;
};

