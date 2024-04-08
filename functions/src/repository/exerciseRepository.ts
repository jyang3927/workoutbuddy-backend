
import { Exercise } from "../models/Exercise";
import ExerciseSchema from "../models/schemas/ExerciseSchema";
import { ObjectId } from "mongodb";


export const findExerciseById = async (exerciseId: string): Promise<Exercise | null> => {
    return await ExerciseSchema.findOne({ _id: new ObjectId(exerciseId) }).exec();
};

export const addExerciseData = async (exercise: Exercise): Promise<Exercise> => {
    return await ExerciseSchema.create(exercise);
};

export const removeExerciseData = async (exerciseId: string): Promise<void> => {
    try{
        await ExerciseSchema.deleteOne({ _id: new ObjectId(exerciseId) }).exec();
        console.log("Successful")
    }
    catch (error) {
    console.error("Failed to delete user activity:", error);
    throw new Error("Failed to delete user activity.");
    }
}

export const editExerciseData = async (exerciseId:string, exerciseUpdate: Partial<Exercise>): Promise<void> => {
    try {
        await ExerciseSchema.findByIdAndUpdate( exerciseId, { $set: exerciseUpdate }).exec();
      } catch (error) {
        throw new Error("Failed to edit user activity.");
      }
}

export const addSetById = async(exerciseId: string, addSet:string): Promise<void> => {
    try{
        await ExerciseSchema.findByIdAndUpdate(exerciseId, {$push: {"sets": new ObjectId(addSet)}}).exec(); 
    }
    catch (error) {
        throw new Error("Failed to edit user activity.");
      }
}

export const deleteSetById = async(exerciseId:string, deleteSet: string): Promise<void> => {
    try{
        await ExerciseSchema.findOneAndUpdate({_id: new ObjectId(exerciseId)}, {$pull: {sets: new ObjectId(deleteSet)}}).exec(); 
    }
    catch (error) {
        throw new Error("Failed to edit user activity.");
      }
}



// export const findAllSets = async (exerciseId: string): Promise<mongoose.Schema.Types.ObjectId[] | null> => {
//     const user = await ExerciseSchema.findOne({ uId: uId }).exec();
//     return user?.sets ?? null;
// };

// export const findFavoriteExercises = async(userId: string): Promise<Exercise[] | null> => {
//     return await ExerciseSchema.find({uId: userId, favoriteExercise: true}).exec(); 
// }