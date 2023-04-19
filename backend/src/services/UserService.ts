import { Request, Response } from "express";
import User from "../entities/User";
import { AppDataSource } from "../data-source";
import { AuthenticatedRequest } from "../middleware/verifyToken";

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  const { tkUser } = req;

  if (!tkUser.isAdmin)
    return res.status(401).json("You are not authorized to see all users");

  try {
    const users = await AppDataSource.getRepository(User).find({
      order: {
        lastName: "ASC",
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateUserDetails = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { tkUser } = req;
  const { email, firstName, lastName } = req.body;
  const userId = req.params.id;

  // Check if user is authorized to update account information
  // if (id !== tkUser.id) {
  //   return res
  //     .status(401)
  //     .json("You are not authorized to update this user's account information");
  // }

  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });
    if (user !== null) {
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      await AppDataSource.getRepository(User).save(user);
    } else {
      return res.status(500).json("Error: user is null!");
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  updateUserDetails,
};
