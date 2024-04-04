import UserActivity from "../models/schemas/UserActivitySchema";
import mongoose from "mongoose";

export const findAllUserActivity = async (uId: string): Promise<Date[]> => {
  const activities = await UserActivity.find({ uId: uId }).exec();
  return activities.map(activity => activity.date); 
};

export const findDatesByMonth = async (uId: string, month: number, year: number): Promise<Date[]> => {
  // Construct the start and end dates for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // Use Mongoose to find documents within the date range
  const activities = await UserActivity.find({
    uId: uId,
    date: { $gte: startDate, $lt: endDate },
  }).exec();

  // Assuming 'date' is a field in UserActivity and you want to return an array of dates
  return activities.map(activity => activity.date);
};

export const findRoutinesForDate = async (userId: string, dateStr: string): Promise<any[]> => {
  // Assuming dateStr is in a format compatible with Date construction
  const date = new Date(dateStr);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const activities = await UserActivity.find({
    uId: userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  }).populate('routines').exec(); // Populate routines assuming they're referenced by ObjectId

  // Assuming you want to return an array of routines from the UserActivity documents
  return activities.map(activity => activity.routines);
};

export const addUserActivity = async (
  userId: string,
  dateStr: string,
  routines: mongoose.Schema.Types.ObjectId[],
  workedOut: boolean = false
): Promise<UserActivity> => {
  const date = new Date(dateStr); // Ensure dateStr is in a compatible format

  try {
    const newActivity = new UserActivity({
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
    await UserActivity.updateOne(
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
    await UserActivity.deleteOne({
      uId: userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).exec();
  } catch (error) {
    console.error("Failed to delete user activity:", error);
    throw new Error("Failed to delete user activity.");
  }
};
