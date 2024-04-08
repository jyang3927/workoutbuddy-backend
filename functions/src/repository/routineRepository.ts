import RoutineSchema from "../models/schemas/RoutineSchema";
import { Routines } from "../models/Routines";
import mongoose from "mongoose";
import UserActivity from "../models/schemas/UserActivitySchema";


interface UpdateRoutineInput {
  routineName?: string;
  exercises?: mongoose.Types.ObjectId[];
}
// Find a routine by its unique ID
export const findRoutineById = async (
  routineId: string
): Promise<Routines | null> => {
  return await RoutineSchema.findById(routineId).exec();
};

// Insert a new routine into the database
export const insertRoutine = async (
  routine: Routines,
  userActivityID: string
): Promise<Routines> => {
  const newRoutine = await RoutineSchema.create(routine);
  await UserActivity.findByIdAndUpdate(
    userActivityID,
    {
      $push: { routines: newRoutine._id },
    },
    { new: true }
  );
  return newRoutine;
};

//find All exercises in routine
export const findAllExercisesInRoutine = async (
  routineId: string
): Promise<any> => {
  if (!mongoose.Types.ObjectId.isValid(routineId)) {
    return null;
  }

  const routine = await RoutineSchema.findById(routineId)
    .populate("exercises") 
    .exec();

  if (!routine) {
    return null;
  }
  const exercises = routine.exercises as unknown as any[];
  // Ideally, you'd want to assert to Exercise[] here
  return exercises;
};
// Add an exercise

export const addExerciseToRoutine = async (
  routineId: string,
  exerciseId: string
): Promise<void> => {
  await RoutineSchema.findByIdAndUpdate(routineId, {
    $push: { exercises: exerciseId },
  }).exec();
};

// Remove an exercise
export const removeExerciseFromRoutine = async (
  routineId: string,
  exerciseId: string
): Promise<void> => {
  await RoutineSchema.findByIdAndUpdate(routineId, {
    $pull: { exercises: exerciseId },
  }).exec();
};
// Deletes a routine by its ID
export const deleteRoutineById = async (
  routineId: string
): Promise<{ deletedCount?: number }> => {
  if (!mongoose.Types.ObjectId.isValid(routineId)) {
    throw new Error("Invalid routine ID");
  }

  const result = await RoutineSchema.deleteOne({ _id: routineId }).exec();
  return { deletedCount: result.deletedCount };
};

// Updates a routine's details
export const updateRoutineById = async (
  routineId: string,
  updateData: UpdateRoutineInput
): Promise<Routines | null> => {
  if (!mongoose.Types.ObjectId.isValid(routineId)) {
    throw new Error("Invalid routine ID");
  }

  const updatedRoutine = await RoutineSchema.findByIdAndUpdate(
    routineId,
    updateData,
    { new: true }
  ).exec();
  return updatedRoutine;
};
