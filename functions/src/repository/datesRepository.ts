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
export const findDatesByMonth = async (
  uId: string,
  month: number,
  year: number
): Promise<Date[]> => {
  const client = await MongoDBConnection.getClient();
  const collection = client.db().collection<Date>(DOCUMENTS.DATE);
  // Aggregation pipeline to filter by user ID, month, and year
  const pipeline = [
    {
      $addFields: {
        // Convert the date string to a date object
        convertedDate: { $dateFromString: { dateString: "$date" } },
      },
    },
    {
      $match: {
        uId: uId, // Filter by user ID
        // Use MongoDB's date aggregation operators to filter by month and year
        $expr: {
          $and: [
            { $eq: [{ $month: "$convertedDate" }, month] },
            { $eq: [{ $year: "$convertedDate" }, year] },
          ],
        },
      },
    },
  ];
  const records = (await collection.aggregate(pipeline).toArray()) as Date[];
  return records;
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
  routines: Routines[],
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
  } catch (error: any) {
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
