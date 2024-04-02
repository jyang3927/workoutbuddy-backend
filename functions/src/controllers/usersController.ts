import { Response, NextFunction } from "express";
import * as usersRepository from "../repository/usersRepository";
import { AuthRequest } from "../models/AuthRequest";

//use AuthRequest to make sure user is logged in and authorized
export const getUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const results = await usersRepository.findUserById(req.userId);
    return res.status(200).json(results);
  } catch (error: any) {
    return next(error);
  }
};

export const addUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersRepository.insertUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return next(error);
  }
};

export const getFavExercises = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    //unsure if req.UserID is what we want in there
    const results = await usersRepository.findAllExercises(req.userId);
    return res.status(200).json(results);
  } catch (error: any) {
    return next(error);
  }
};

export const getFavRoutines = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    //unsure if req.UserID is what we want in there
    const results = await usersRepository.findAllRoutines(req.userId);
    return res.status(200).json(results);
  } catch (error: any) {
    return next(error);
  }
};

export const addFavExercise = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const exercise = await usersRepository.addToExercises(req.body);
    return res.status(201).json(exercise);
  } catch (error: any) {
    return next(error);
  }
};

export const addFavRoutine = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const routine = await usersRepository.addToRoutines(req.body);
    return res.status(201).json(routine);
  } catch (error: any) {
    return next(error);
  }
};

export const deleteFavExercise = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const exercise = await usersRepository.deleteFromExercises(req.body);
    return res.status(201).json(exercise);
  } catch (error: any) {
    return next(error);
  }
};

export const deleteFavRoutine = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const routine = await usersRepository.deleteFromRoutines(req.body);
    return res.status(201).json(routine);
  } catch (error: any) {
    return next(error);
  }
};
