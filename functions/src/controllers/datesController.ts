import { Response, NextFunction } from "express";
import * as datesRepository from "../repository/datesRepository";
import { AuthRequest } from "../models/AuthRequest";

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

// export const getAllRountinesforDate = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.userId) {
//       return res.status(401).json({ message: "unauthorized" });
//     }
//     // const results = await datesRepository.findRoutinesForDate(
// //       req.userId,
// //       req.params.date
// //     );
// //     return res.status(200).json(results);
// //   } catch (error: any) {
// //     return next(error);
// //   }
// // };