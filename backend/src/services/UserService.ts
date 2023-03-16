import { Request, Response } from "express";
import User from "../entities/User";
import { AppDataSource } from "../data-source";
import { AuthenticatedRequest } from "../middleware/verifyToken";

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  const { tkUser } = req;
  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        id: tkUser.id,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getUser,
};
