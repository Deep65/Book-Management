import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entities/User.js";
import { UserLogin, UserRegisteration } from "../types/UserInput.js";
import { hashPassword, verifyPassword } from "../utils/commonFuntions.js";
import jwt from "jsonwebtoken";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("data", () => UserRegisteration) data: UserRegisteration
  ): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    const user = User.create({ ...data, password: hashedPassword });
    await user.save();
    return user;
  }

  @Mutation(() => String, { nullable: true })
  async login(
    @Arg("data", () => UserLogin) data: UserLogin
  ): Promise<string | null> {
    const { email, password } = data;
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) return "User doesn't exists";

    const isValidPassword = await verifyPassword(
      password,
      existingUser.password
    );
    if (!isValidPassword) return "Password doesn't match";

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}
