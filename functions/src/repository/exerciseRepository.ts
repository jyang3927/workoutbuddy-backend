
import { Exercise } from "../models/Exercise";
import ExerciseSchema from "../models/schemas/ExerciseSchema";
import { ObjectId } from "mongodb";


export const findExerciseById = async (exerciseId: string): Promise<Exercise | null> => {
    return await ExerciseSchema.findOne({ _id: new ObjectId(exerciseId) }).exec();
};

// export const findFavoriteExercises = async(userId: string): Promise<Exercise[] | null> => {
//     return await ExerciseSchema.find({uId: userId, favoriteExercise: true}).exec(); 
// }

export const addExerciseData = async (exercise: Exercise): Promise<Exercise> => {
    return await ExerciseSchema.create(exercise);
};

export const removeExerciseData = async (exerciseId: string): Promise<void> => {
    await ExerciseSchema.deleteOne({ _id: new ObjectId(exerciseId) }).exec();
}

export const editExerciseData = async (exerciseId:string, updates: Partial<Exercise>): Promise<void> => {
    try {
        await ExerciseSchema.updateOne(
          { _id: new ObjectId(exerciseId)}, { $set: updates }).exec();
      } catch (error) {
        console.error("Failed to edit user activity:", error);
        throw new Error("Failed to edit user activity.");
      }
}

// export const findAllSets = async (exerciseId: string): Promise<mongoose.Schema.Types.ObjectId[] | null> => {
//     const user = await ExerciseSchema.findOne({ uId: uId }).exec();
//     return user?.sets ?? null;
// };

