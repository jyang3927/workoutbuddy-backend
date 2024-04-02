import { Response, NextFunction } from "express";
import * as datesRepository from "../repository/datesRepository";
import { AuthRequest } from "../models/AuthRequest";
import { Auth } from "firebase-admin/auth";

export const getAllDates = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const results = await datesRepository.findAllDates(req.userId);
    return res.status(200).json(results);
  } catch (error: any) {
    return next(error);
  }
};

export const getAllRountinesforDate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const results = await datesRepository.findRoutinesForDate(
      req.userId,
      req.params.date
    );
    return res.status(200).json(results);
  } catch (error: any) {
    return next(error);
  }
};

export const addDateToUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date, routines, workedOut } = req.body;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    const newDateDocument = await datesRepository.addDate(
      req.userId,
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
    await datesRepository.editDate(userId, date, updateData);
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

    await datesRepository.deleteDate(userId, date);

    return res.status(200).json({ message: "Date deleted successfully." });
  } catch (error) {
    console.error("Error deleting date:", error);
    return next(error);
  }
};
