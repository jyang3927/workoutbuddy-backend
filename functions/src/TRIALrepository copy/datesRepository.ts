import { MongoDBConnection } from "../config/MongoDBConnection";
import { DOCUMENTS } from "../constants/Documents";
import { Routines } from "../models/Routines";
import { Date } from "../models/Date";

export const findAllDates = async (uId: string): Promise<Date[]> => {
  const client = await MongoDBConnection.getClient();
  const datesCollection = client.db().collection<Date>(DOCUMENTS.DATE);
  const dates = await datesCollection.find({ uId: uId }).toArray();
  return dates;
};

export const findRoutinesForDate = async (
  userId: string,
  dateStr: string
): Promise<Routines[]> => {
  const client = await MongoDBConnection.getClient();
  const datesCollection = client.db().collection<Date>(DOCUMENTS.DATE);
  const dateDoc = await datesCollection.findOne({ uId: userId, date: dateStr });
  return dateDoc?.routines ?? [];
};

export const addDate = async (
  userId: string,
  dateStr: string,
  routines = [],
  workedOut: boolean = false
): Promise<Date> => {
  const client = await MongoDBConnection.getClient();
  const datesCollection = client.db().collection<Date>(DOCUMENTS.DATE);
  const newDate: Date = {
    uId: userId,
    date: dateStr,
    routines: routines,
    workedOut: workedOut,
  };
  try {
    await datesCollection.insertOne(newDate);
    return newDate;
  } catch (error) {
    console.error("Failed to add new date:", error);
    throw new Error("Failed to add new date.");
  }
};

export const editDate = async (
  userId: string,
  dateStr: string,
  updateData: Partial<Date>
): Promise<void> => {
  const client = await MongoDBConnection.getClient();
  const datesCollection = client.db().collection<Date>(DOCUMENTS.DATE);
  await datesCollection.updateOne(
    { uId: userId, date: dateStr },
    { $set: updateData }
  );
};

export const deleteDate = async (
  userId: string,
  dateStr: string
): Promise<void> => {
  const client = await MongoDBConnection.getClient();
  const datesCollection = client.db().collection<Date>(DOCUMENTS.DATE);

  await datesCollection.deleteOne({ uId: userId, date: dateStr });
};
