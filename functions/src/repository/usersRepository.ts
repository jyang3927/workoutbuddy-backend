import { Routines } from "../models/Routines";
import UserSchema from "../models/schemas/UserSchema";
import { ExerciseWithoutSet, User } from '../models/User';

export const findUserById = async (uId: string): Promise<User | null> => {
    return await UserSchema.findOne({ uId: uId }).exec();
};

export const insertUser = async (user: User): Promise<User> => {
    return await UserSchema.create(user);
};

export const findAllExercises = async (uId: string): Promise<ExerciseWithoutSet[] | null> => {
    const user = await UserSchema.findOne({ uId: uId }).exec();
    return user?.favExercises ?? null;
};

export const findAllRoutines = async (uId: string): Promise<Routines[] | null> => {
    const user = await UserSchema.findOne({ uId: uId }).exec();
    return user?.favRoutines ?? null;
};

export const addToExercises = async (uId: string, exercise: ExerciseWithoutSet) => {
    await UserSchema.updateOne({ uId: uId }, { $push: { favExercises: exercise } }).exec();
  };
  
export const addToRoutines = async (uId: string, routine: Routines) => {
    await UserSchema.updateOne({ uId: uId }, { $push: { favRoutines: routine } }).exec();
};

export const deleteFromExercises = async (uId: string, exercise: string) => {
    await UserSchema.updateOne({ uId: uId }, { $pull: { favExercises: { name: exercise } } }).exec();
};
  
export const deleteFromRoutines = async (uId: string, routine: string) => {
    await UserSchema.updateOne({ uId: uId }, { $pull: { favRoutines: { routineName: routine } } }).exec();
};