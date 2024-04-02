import { MongoDBConnection } from "../config/MongoDBConnection";
import { DOCUMENTS } from "../constants/Documents";
import { Routines } from "../models/Routines";
import User from "../models/User";

export const findAllDates = async (uId: string): Promise<Date[]> => {
  const client = await MongoDBConnection.getClient();
  const datesCollection = client.db().collection<Date>(DOCUMENTS.DATE);
  const dates = await datesCollection.find({ uId: uId }).toArray();
  return dates;
};