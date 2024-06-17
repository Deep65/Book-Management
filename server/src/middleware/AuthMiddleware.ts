import jwt from "jsonwebtoken";
import { User } from "./../entities/User";
import dotenv from "dotenv";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";

dotenv.config();

export const context = async ({
  req,
}: StandaloneServerContextFunctionArgument) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { existingUser: null };
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return { existingUser: null };
  }

  try {
    const decodedUser: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const existingUser = await User.findOne({
      where: { email: decodedUser.email as any },
    });
    return { existingUser };
  } catch (err) {
    console.log("Error verifying token:", err);
    return { existingUser: null };
  }
};
