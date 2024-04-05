import { Response, NextFunction } from "express";
<<<<<<< HEAD
import * as datesRepository from "../repository/userActivityRepository"

=======
import * as userActivityRepository from "../repository/userActivityRepository";
>>>>>>> main
import { AuthRequest } from "../models/AuthRequest";

export const getAllDates = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(400).send("Unauthorized");
    }
    const month = req.query.month ? parseInt(req.query.month as string) : null;
    const year = req.query.year ? parseInt(req.query.year as string) : null;
    const date = req.query.date ? (req.query.date as string) : null;
    let results;
    if (month && year && !date) {
      results = await userActivityRepository.findDatesByMonth(
        userId,
        month,
        year
      );
    } else if (date) {
      results = await userActivityRepository.findUserActivityByDate(
        userId,
        date
      );
    } else {
      results = await userActivityRepository.findAllUserActivity(userId);
    }
    return res.status(200).json(results);
  } catch (error: any) {
    return next(error);
  }
};

export const addUserActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(400).send("Unauthorized");
    }

    const { date, routines, workedOut } = req.body;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    const newDateDocument = await userActivityRepository.addUserActivity(
      userId,
      date,
      routines,
      workedOut
    );

    return res.status(201).json({
      message: "Date added successfully",
      date: newDateDocument,
    });
  } catch (error: any) {
    console.error("Error adding date:", error);
    return next(error);
  }
};

export const editDate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, date } = req.params;
    const updateData = req.body;
    if (!userId || !date) {
      return res
        .status(400)
        .json({ message: "Missing userId or date in request." });
    }
    await userActivityRepository.editUserActivity(userId, date, updateData);
    return res.status(200).json({ message: "Date updated successfully." });
  } catch (error: any) {
    console.error("Error updating date:", error);
    return next(error);
  }
};

export const deleteDate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, date } = req.params;

    if (!userId || !date) {
      return res
        .status(400)
        .json({ message: "Missing userId or date in request." });
    }

    await userActivityRepository.deleteUserActivity(userId, date);

    return res.status(200).json({ message: "Date deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting date:", error);
    return next(error);
  }
};
