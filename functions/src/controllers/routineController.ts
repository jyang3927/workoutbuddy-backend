import { Response, NextFunction } from "express";
import * as routineRepository from "../repository/routineRepository"; // Make sure to implement this repository
import { AuthRequest } from "../models/AuthRequest";
import { Routines } from "../models/Routines";

// Get a single routine by ID
export const getRoutine = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    console.log(userId);
    if (!userId) {
      return res.status(400).send("Unauthorized");
    }
    const routineId = req.params.routineId;
    const routine = await routineRepository.findRoutineById(routineId);
    if (!routine) {
      return res.status(404).send("Routine not found");
    }
    return res.status(200).json(routine);
  } catch (error: any) {
    return next(error);
  }
};

// Add a new routine
export const addRoutine = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(400).send("Unauthorized");
    }
    const newRoutine = req.body as Routines;
    newRoutine.uId = userId;
    const result = await routineRepository.insertRoutine(newRoutine);
    return res.status(201).json(result);
  } catch (error: any) {
    return next(error);
  }
};

// Update a routine
export const updateRoutine = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(400).send("Unauthorized");
    }
    const routineId = req.params.routineId;
    const updateData = req.body;
    const updatedRoutine = await routineRepository.updateRoutineById(
      routineId,
      updateData
    );
    if (!updatedRoutine) {
      return res.status(404).send("Routine not found");
    }
    return res.status(200).json(updatedRoutine);
  } catch (error: any) {
    return next(error);
  }
};

// Delete a routine
export const deleteRoutine = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(400).send("Unauthorized");
    }
    const routineId = req.params.routineId;
    await routineRepository.deleteRoutineById(routineId);
    return res.status(204).send();
  } catch (error: any) {
    return next(error);
  }
};
