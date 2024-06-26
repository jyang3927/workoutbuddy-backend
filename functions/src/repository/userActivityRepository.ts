import { UserActivity } from "../models/UserActivity";
import UserActivitySchema from "../models/schemas/UserActivitySchema";
import mongoose from "mongoose";

export const findAllUserActivity = async (
  uId: string
): Promise<UserActivity[]> => {
  const activities = await UserActivitySchema.find({ uId: uId }).exec();
  return activities;
};

export const findDatesByMonth = async (
  uId: string,
  month: number,
  year: number
): Promise<UserActivity[]> => {
  // Construct the start and end dates for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // Use Mongoose to find documents within the date range
  const activities = await UserActivitySchema.find({
    uId: uId,
    date: { $gte: startDate, $lt: endDate },
  }).populate("routines").exec();

  // Assuming 'date' is a field in UserActivity and you want to return an array of dates
  return activities;
};

export const findUserActivityByDate = async (
  userId: string,
  dateStr: string
): Promise<any[]> => {
  // Assuming dateStr is in a format compatible with Date construction
  const date = new Date(dateStr);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const activities = await UserActivitySchema.find({
    uId: userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate("routines")
    .populate("exercises")
    .exec(); // Populate routines assuming they're referenced by ObjectId

  // Assuming you want to return an array of routines from the UserActivity documents
  return activities;
};

export const addUserActivity = async (
  userId: string,
  dateStr: string,
  routines: mongoose.Schema.Types.ObjectId[],
  workedOut: boolean = false
): Promise<UserActivity> => {
  const date = new Date(dateStr); // Ensure dateStr is in a compatible format
  try {
    const newActivity = new UserActivitySchema({
      uId: userId,
      date: date,
      routines: routines,
      workedOut: workedOut,
    });
    await newActivity.save();
    return newActivity;
  } catch (error) {
    console.error("Failed to add new user activity:", error);
    throw new Error("Failed to add new user activity.");
  }
};

export const editUserActivity = async (
  userId: string,
  dateStr: string,
  updateData: Partial<UserActivity>
): Promise<void> => {
  const date = new Date(dateStr);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  try {
    await UserActivitySchema.updateOne(
      { uId: userId, date: { $gte: startOfDay, $lte: endOfDay } },
      { $set: updateData }
    ).exec();
  } catch (error) {
    console.error("Failed to edit user activity:", error);
    throw new Error("Failed to edit user activity.");
  }
};

export const deleteUserActivity = async (
  userId: string,
  dateStr: string
): Promise<void> => {
  const date = new Date(dateStr);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  try {
    await UserActivitySchema.deleteOne({
      uId: userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).exec();
  } catch (error) {
    console.error("Failed to delete user activity:", error);
    throw new Error("Failed to delete user activity.");
  }
};
