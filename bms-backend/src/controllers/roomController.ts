import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRooms = async (_req: Request, res: Response) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};
