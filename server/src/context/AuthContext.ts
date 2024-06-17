import { User } from "../entities/User";

export interface authContext {
  existingUser: User | null;
}
